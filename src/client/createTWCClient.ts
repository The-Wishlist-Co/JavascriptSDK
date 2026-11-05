import { TokenManager } from "./tokens";
import { TWCError, codeForStatus, invalidArgument, notFound } from "./errors";

const API_BASE = "https://api.au-aws.thewishlist.io/services";
const AUTH_BASE = "https://auth.au-aws.thewishlist.io/auth/realms";
// byCustomer is read as a single page; tenants allow far fewer wishlists per customer than this.
const WISHLISTS_PAGE_SIZE = 100;
const CUSTOMER_ID_CACHE_MS = 5 * 60 * 1000;

// Fields of the customer update body (CreateCustomerDto). PUT /customers rebuilds the record from
// the body, so linking a Shopify login must send these back unchanged or they are cleared.
const CUSTOMER_UPDATE_FIELDS = [
  "addresses", "alternateCustomerRef", "attributeGroups", "dob", "email", "firstName",
  "joinedStoreId", "joinedStoreName", "lastName", "loyaltyTier", "memberSince", "mobile",
  "optin_preferences", "phone", "preferredStore", "spendToNextTier", "vipStatus",
];

export interface TWCClientOptions {
  /** Your TWC tenant. */
  tenant: string;
  /** Your TWC server API client ID. */
  clientId: string;
  /** Your TWC server API client secret. Keep it in your server's secrets manager or environment. */
  clientSecret: string;
  /** A fetch implementation. Defaults to the runtime's global fetch (Node 18+, worker runtimes). */
  fetch?: typeof fetch;
}

/** The logged-in shopper, taken by your server from the verified Shopify session. Never from the browser. */
export interface Customer {
  /** The Shopify customer ID. */
  customerRef: string;
  /** The customer's email address. */
  email: string;
}

export interface WishlistSummary {
  id: string;
  name?: string;
  itemCount?: number;
  [field: string]: unknown;
}

export interface CustomerWishlists {
  totalItemsAllWishlists: number;
  wishlists: WishlistSummary[];
}

export interface WishlistItemsPage {
  wishlistItems: Record<string, any>[];
  itemCount?: number;
  /** Pass as `lastItemId` to get the next page; absent on the last page. */
  lastEvaluatedItemId?: string;
}

export interface SharedWishlist {
  name: string;
  items: { productRef: string | null; variantRef: string | null }[];
  /** Pass as `lastItemId` to get the next page; absent on the last page. */
  lastItemId?: string;
}

export type InterestKind = "notifyMe" | "comingSoon";

export interface InterestSignup {
  email: string;
  variantRef: string;
  kind: InterestKind;
  firstName?: string;
  lastName?: string;
  mobile?: string;
  countryCode?: string;
  provinceCode?: string;
  marketId?: string;
  marketHandle?: string;
  /** Email marketing opt-in. */
  subscribe?: boolean;
  /** SMS marketing opt-in. */
  subscribeSms?: boolean;
}

interface RequestOptions {
  query?: Record<string, string | number | undefined>;
  body?: unknown;
  /** Return null instead of throwing on 404. */
  allow404?: boolean;
}

/**
 * Creates a TWC client for server-side code. It requests and refreshes its own access token
 * and offers operations scoped to one shopper: every operation on a wishlist or item first
 * checks it belongs to the customer you pass, and returns not-found if it doesn't.
 *
 * Throws if created in a browser: the client holds your server credentials.
 */
export function createTWCClient(options: TWCClientOptions) {
  if (typeof document !== "undefined") {
    throw new TWCError(
      "The TWC client is server-side only: it holds your TWC server credentials, which must never reach a browser.",
      0,
      "browser_not_supported"
    );
  }
  const { tenant, clientId, clientSecret } = options || ({} as TWCClientOptions);
  if (!tenant || !clientId || !clientSecret) {
    throw invalidArgument("createTWCClient needs tenant, clientId and clientSecret.");
  }
  const fetchImpl = options.fetch || globalThis.fetch;
  if (typeof fetchImpl !== "function") {
    throw invalidArgument("No fetch implementation available; pass one as options.fetch.");
  }

  const tokens = new TokenManager(
    `${AUTH_BASE}/${encodeURIComponent(tenant)}/protocol/openid-connect/token`,
    clientId,
    clientSecret,
    fetchImpl
  );
  const customerIds = new Map<string, { id: string; expiresAt: number }>();

  // `label` names the operation in errors without any values from the path (which can hold an email).
  async function request<T = any>(method: string, path: string, label: string, opts: RequestOptions = {}, retried = false): Promise<T> {
    const url = new URL(API_BASE + path);
    const query = opts.query || {};
    for (const key of Object.keys(query)) {
      const value = query[key];
      if (value !== undefined && value !== "") url.searchParams.append(key, String(value));
    }
    const token = await tokens.get();
    let res: Response;
    try {
      res = await fetchImpl(url.toString(), {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
          "X-TWC-Tenant": tenant,
          ...(opts.body !== undefined ? { "Content-Type": "application/json" } : {}),
        },
        body: opts.body !== undefined ? JSON.stringify(opts.body) : undefined,
      });
    } catch {
      throw new TWCError(`TWC ${label} failed: no response`, 0, "network_error");
    }
    if (res.status === 401 && !retried) {
      tokens.invalidate();
      return request<T>(method, path, label, opts, true);
    }
    if (res.status === 404 && opts.allow404) return null as T;
    if (!res.ok) {
      throw new TWCError(`TWC ${label} failed with ${res.status}`, res.status, codeForStatus(res.status));
    }
    const text = await res.text();
    if (!text) return null as T;
    try {
      return JSON.parse(text) as T;
    } catch {
      throw new TWCError(`TWC ${label} returned a response that is not JSON`, res.status, "server_error");
    }
  }

  function checkCustomer(customer: Customer): void {
    if (!customer || typeof customer.customerRef !== "string" || !customer.customerRef.trim() ||
        typeof customer.email !== "string" || !customer.email.trim()) {
      throw invalidArgument("customer needs customerRef and email from the verified session.");
    }
  }

  function checkId(value: unknown, name: string): asserts value is string {
    if (typeof value !== "string" || !value.trim()) throw invalidArgument(`${name} is required.`);
  }

  const getCustomerByRef = (ref: string) =>
    request("GET", `/customerservice/api/v2/customers/${encodeURIComponent(ref)}/ref`, "GET customers/{customerRef}/ref", { allow404: true });
  const getCustomerByEmail = (email: string) =>
    request("GET", `/customerservice/api/v2/customers/${encodeURIComponent(email)}/email`, "GET customers/{email}/email", { allow404: true });

  /**
   * The customer's TWC record, read-only: by Shopify customer ID, else by email when that record
   * has no Shopify customer ID yet. A record linked to a different Shopify customer is not theirs.
   */
  async function findCustomer(customer: Customer): Promise<Record<string, any> | null> {
    const byRef = await getCustomerByRef(customer.customerRef);
    if (byRef) return byRef;
    const byEmail = await getCustomerByEmail(customer.email);
    if (byEmail && (!byEmail.customerRef || byEmail.customerRef === customer.customerRef)) return byEmail;
    return null;
  }

  async function customerId(customer: Customer, create: boolean): Promise<string | null> {
    const cached = customerIds.get(customer.customerRef);
    if (cached && Date.now() < cached.expiresAt) return cached.id;
    const record = create ? await ensureCustomer(customer) : await findCustomer(customer);
    if (!record || !record.id) return null;
    if (record.customerRef === customer.customerRef) {
      customerIds.set(customer.customerRef, { id: record.id, expiresAt: Date.now() + CUSTOMER_ID_CACHE_MS });
    }
    return record.id;
  }

  async function listWishlists(id: string): Promise<CustomerWishlists> {
    const data = await request("GET", "/wsservice/api/wishlists/byCustomer", "GET wishlists/byCustomer", {
      query: { customerId: id, pageSize: WISHLISTS_PAGE_SIZE },
      allow404: true,
    });
    return {
      totalItemsAllWishlists: Number(data?.totalItemsAllWishlists) || 0,
      wishlists: Array.isArray(data?.wishlists) ? data.wishlists : [],
    };
  }

  /** Throws not-found unless the wishlist belongs to the customer. Returns the customer's TWC ID. */
  async function assertOwnsWishlist(customer: Customer, wishlistId: string): Promise<string> {
    const id = await customerId(customer, false);
    if (!id) throw notFound("Wishlist");
    const { wishlists } = await listWishlists(id);
    if (!wishlists.some((w) => w.id === wishlistId)) throw notFound("Wishlist");
    return id;
  }

  /** Loads an item and throws not-found unless its wishlist belongs to the customer. */
  async function ownedItem(customer: Customer, itemId: string): Promise<Record<string, any>> {
    const item = await request("GET", `/wsservice/api/wishlist/items/${encodeURIComponent(itemId)}`, "GET wishlist/items/{id}", { allow404: true });
    if (!item || typeof item.wishlistId !== "string") throw notFound("Wishlist item");
    await assertOwnsWishlist(customer, item.wishlistId).catch((e) => {
      throw e instanceof TWCError && e.code === "not_found" ? notFound("Wishlist item") : e;
    });
    return item;
  }

  /**
   * Finds the customer's TWC record, creating it or linking the Shopify login to it when needed:
   * - found by Shopify customer ID: returned as is;
   * - found by email with no Shopify customer ID: the Shopify customer ID is added;
   * - found by email but linked to another Shopify customer: throws `customer_conflict`;
   * - not found: created with the email and Shopify customer ID.
   */
  async function ensureCustomer(customer: Customer, details: { firstName?: string; lastName?: string } = {}): Promise<Record<string, any>> {
    checkCustomer(customer);
    const byRef = await getCustomerByRef(customer.customerRef);
    if (byRef) return byRef;

    const byEmail = await getCustomerByEmail(customer.email);
    if (byEmail) {
      if (byEmail.customerRef && byEmail.customerRef !== customer.customerRef) {
        throw new TWCError("This email belongs to a TWC customer linked to another Shopify customer.", 409, "customer_conflict");
      }
      const body: Record<string, unknown> = { id: byEmail.id };
      for (const field of CUSTOMER_UPDATE_FIELDS) {
        if (byEmail[field] !== undefined && byEmail[field] !== null) body[field] = byEmail[field];
      }
      return request("PUT", "/customerservice/api/v2/customers", "PUT customers", {
        query: { customerRef: customer.customerRef },
        body,
      });
    }

    return request("POST", "/customerservice/api/v2/customers", "POST customers", {
      body: {
        email: customer.email,
        customerRef: customer.customerRef,
        ...(details.firstName ? { firstName: details.firstName } : {}),
        ...(details.lastName ? { lastName: details.lastName } : {}),
      },
    });
  }

  return {
    ensureCustomer,

    /** All of the customer's wishlists, without items. Empty when the customer has no TWC record yet. */
    async getWishlists(customer: Customer): Promise<CustomerWishlists> {
      checkCustomer(customer);
      const id = await customerId(customer, false);
      return id ? listWishlists(id) : { totalItemsAllWishlists: 0, wishlists: [] };
    },

    /** One of the customer's wishlists. */
    async getWishlist(customer: Customer, wishlistId: string): Promise<Record<string, any>> {
      checkCustomer(customer);
      checkId(wishlistId, "wishlistId");
      await assertOwnsWishlist(customer, wishlistId);
      return request("GET", "/wsservice/api/wishlists", "GET wishlists", { query: { id: wishlistId } });
    },

    /** One page of items from one of the customer's wishlists. */
    async getWishlistItems(customer: Customer, wishlistId: string, page: { pageSize?: number; lastItemId?: string } = {}): Promise<WishlistItemsPage> {
      checkCustomer(customer);
      checkId(wishlistId, "wishlistId");
      await assertOwnsWishlist(customer, wishlistId);
      const data = await request("GET", "/wsservice/api/wishlist/items", "GET wishlist/items", {
        query: { id: wishlistId, pageSize: page.pageSize, lastItemId: page.lastItemId },
      });
      return {
        wishlistItems: Array.isArray(data?.wishlistItems) ? data.wishlistItems : [],
        itemCount: data?.itemCount,
        ...(data?.lastEvaluatedItemId ? { lastEvaluatedItemId: data.lastEvaluatedItemId } : {}),
      };
    },

    /** Creates a wishlist for the customer, creating or linking their TWC record first if needed. */
    async createWishlist(customer: Customer, wishlist: { name: string; description?: string; isPrivate?: boolean }): Promise<Record<string, any>> {
      checkCustomer(customer);
      checkId(wishlist?.name, "name");
      const id = await customerId(customer, true);
      return request("POST", "/wsservice/api/wishlists", "POST wishlists", {
        body: {
          customerId: id,
          name: wishlist.name,
          ...(wishlist.description !== undefined ? { description: wishlist.description } : {}),
          ...(wishlist.isPrivate !== undefined ? { isPrivate: wishlist.isPrivate } : {}),
        },
      });
    },

    async renameWishlist(customer: Customer, wishlistId: string, name: string): Promise<Record<string, any>> {
      checkCustomer(customer);
      checkId(wishlistId, "wishlistId");
      checkId(name, "name");
      await assertOwnsWishlist(customer, wishlistId);
      return request("PUT", "/wsservice/api/wishlists", "PUT wishlists", { body: { id: wishlistId, name } });
    },

    async deleteWishlist(customer: Customer, wishlistId: string): Promise<void> {
      checkCustomer(customer);
      checkId(wishlistId, "wishlistId");
      await assertOwnsWishlist(customer, wishlistId);
      await request("DELETE", "/wsservice/api/wishlists", "DELETE wishlists", { query: { id: wishlistId } });
    },

    /** Adds a product variant to one of the customer's wishlists. */
    async addItem(customer: Customer, wishlistId: string, item: { productRef: string; variantRef: string; wishlistItemRef?: string; attributeGroups?: unknown }): Promise<Record<string, any>> {
      checkCustomer(customer);
      checkId(wishlistId, "wishlistId");
      checkId(item?.productRef, "productRef");
      checkId(item?.variantRef, "variantRef");
      await assertOwnsWishlist(customer, wishlistId);
      return request("POST", "/wsservice/api/wishlist/items", "POST wishlist/items", {
        body: {
          wishlistId,
          product: { productRef: item.productRef, selectedVariantRef: item.variantRef },
          ...(item.wishlistItemRef ? { wishlistItemRef: item.wishlistItemRef } : {}),
          ...(item.attributeGroups !== undefined ? { attributeGroups: item.attributeGroups } : {}),
        },
      });
    },

    /** Changes the selected variant (e.g. size or colour) of an item in one of the customer's wishlists. */
    async changeItemVariant(customer: Customer, itemId: string, variantRef: string): Promise<Record<string, any>> {
      checkCustomer(customer);
      checkId(itemId, "itemId");
      checkId(variantRef, "variantRef");
      const item = await ownedItem(customer, itemId);
      return request("PUT", "/wsservice/api/wishlist/items", "PUT wishlist/items", {
        body: {
          id: item.id,
          wishlistId: item.wishlistId,
          product: {
            productRef: item.product?.productRef,
            // wsservice reads selectedVariantId without a null check, so it is always sent.
            selectedVariantId: "",
            selectedVariantRef: variantRef,
            oldVariantRef: item.product?.selectedVariantRef,
          },
        },
      });
    },

    /** Removes an item from one of the customer's wishlists. */
    async removeItem(customer: Customer, itemId: string): Promise<void> {
      checkCustomer(customer);
      checkId(itemId, "itemId");
      const item = await ownedItem(customer, itemId);
      await request("DELETE", `/wsservice/api/wishlist/items/${encodeURIComponent(item.id)}`, "DELETE wishlist/items/{id}");
    },

    /**
     * A shared wishlist for a share page: the list name and products only. All customer data is
     * removed, and a private or deleted wishlist is not found.
     */
    async getSharedWishlist(wishlistId: string, page: { pageSize?: number; lastItemId?: string } = {}): Promise<SharedWishlist> {
      checkId(wishlistId, "wishlistId");
      const wishlist = await request("GET", "/wsservice/api/wishlists", "GET wishlists", { query: { id: wishlistId }, allow404: true });
      if (!wishlist || wishlist.deleted === true || wishlist.isPrivate === true) throw notFound("Wishlist");
      const data = await request("GET", "/wsservice/api/wishlist/items", "GET wishlist/items", {
        query: { id: wishlistId, pageSize: page.pageSize, lastItemId: page.lastItemId },
      });
      const items = Array.isArray(data?.wishlistItems) ? data.wishlistItems : [];
      return {
        name: typeof wishlist.name === "string" ? wishlist.name : "",
        items: items.map((i: any) => ({
          productRef: i?.product?.productRef ?? null,
          variantRef: i?.product?.selectedVariantRef ?? null,
        })),
        ...(data?.lastEvaluatedItemId ? { lastItemId: data.lastEvaluatedItemId } : {}),
      };
    },

    /**
     * Registers a Notify Me (back in stock) or Coming Soon interest. For a logged-in customer, pass
     * the session's email, not one from the form. Protect your sign-up endpoint against abuse.
     */
    async registerInterest(signup: InterestSignup): Promise<unknown> {
      checkId(signup?.email, "email");
      checkId(signup?.variantRef, "variantRef");
      if (signup.kind !== "notifyMe" && signup.kind !== "comingSoon") {
        throw invalidArgument('kind must be "notifyMe" or "comingSoon".');
      }
      const { kind, ...fields } = signup;
      return request("POST", "/wsservice/api/wishlist/items/customerInterest", "POST wishlist/items/customerInterest", {
        body: { ...fields, [kind]: true },
      });
    },

    /** The customer's Notify Me / Coming Soon interests (a wishlist with items), or null if none. */
    async getInterests(customer: Customer): Promise<Record<string, any> | null> {
      checkCustomer(customer);
      return request("GET", `/wsservice/api/wishlist/items/customerInterest/${encodeURIComponent(customer.email)}`, "GET wishlist/items/customerInterest/{email}", { allow404: true });
    },

    /** Cancels one of the customer's interests in a variant. */
    async cancelInterest(customer: Customer, variantRef: string, kind: InterestKind): Promise<void> {
      checkCustomer(customer);
      checkId(variantRef, "variantRef");
      if (kind !== "notifyMe" && kind !== "comingSoon") throw invalidArgument('kind must be "notifyMe" or "comingSoon".');
      const id = await customerId(customer, false);
      if (!id) throw notFound("Interest");
      await request("DELETE", "/wsservice/api/wishlist/items/customerInterest", "DELETE wishlist/items/customerInterest", {
        query: { customerId: id, variantRef, isNotifyMe: String(kind === "notifyMe") },
      });
    },
  };
}

export type TWCClient = ReturnType<typeof createTWCClient>;
