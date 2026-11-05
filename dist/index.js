'use strict';

var axios = require('axios');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var axios__default = /*#__PURE__*/_interopDefault(axios);

var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// src/client/errors.ts
var TWCError = class extends Error {
  constructor(message, status, code) {
    super(message);
    this.name = "TWCError";
    this.status = status;
    this.code = code;
  }
};
function codeForStatus(status) {
  if (status === 400)
    return "bad_request";
  if (status === 401)
    return "unauthorized";
  if (status === 403)
    return "forbidden";
  if (status === 404)
    return "not_found";
  if (status === 409)
    return "conflict";
  if (status === 429)
    return "rate_limited";
  return "server_error";
}
function notFound(what) {
  return new TWCError(`${what} not found`, 404, "not_found");
}
function invalidArgument(message) {
  return new TWCError(message, 0, "invalid_argument");
}

// src/client/tokens.ts
var REFRESH_BEFORE_EXPIRY_MS = 30 * 1e3;
var TokenManager = class {
  constructor(tokenUrl, clientId, clientSecret, fetchImpl) {
    this.tokenUrl = tokenUrl;
    this.clientId = clientId;
    this.clientSecret = clientSecret;
    this.fetchImpl = fetchImpl;
    this.token = null;
    this.expiresAt = 0;
    this.inFlight = null;
  }
  /** A valid token, requesting a new one when there is none or it expires within 30 seconds. */
  get() {
    if (this.token && Date.now() < this.expiresAt - REFRESH_BEFORE_EXPIRY_MS) {
      return Promise.resolve(this.token);
    }
    if (!this.inFlight) {
      this.inFlight = this.request().then(
        (token) => {
          this.inFlight = null;
          return token;
        },
        (error) => {
          this.inFlight = null;
          throw error;
        }
      );
    }
    return this.inFlight;
  }
  /** Drop the cached token, e.g. after TWC rejects it with a 401. */
  invalidate() {
    this.token = null;
    this.expiresAt = 0;
  }
  request() {
    return __async(this, null, function* () {
      let res;
      try {
        res = yield this.fetchImpl(this.tokenUrl, {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams({
            grant_type: "client_credentials",
            client_id: this.clientId,
            client_secret: this.clientSecret
          }).toString()
        });
      } catch (e) {
        throw new TWCError("TWC token request failed: no response", 0, "network_error");
      }
      if (!res.ok) {
        throw new TWCError(`TWC token request failed with ${res.status}`, res.status, "auth_failed");
      }
      const data = yield res.json().catch(() => null);
      if (!data || typeof data.access_token !== "string") {
        throw new TWCError("TWC token request returned no access token", res.status, "auth_failed");
      }
      this.token = data.access_token;
      this.expiresAt = Date.now() + (Number(data.expires_in) || 60) * 1e3;
      return data.access_token;
    });
  }
};

// src/client/createTWCClient.ts
var API_BASE = "https://api.au-aws.thewishlist.io/services";
var AUTH_BASE = "https://auth.au-aws.thewishlist.io/auth/realms";
var WISHLISTS_PAGE_SIZE = 100;
var CUSTOMER_ID_CACHE_MS = 5 * 60 * 1e3;
var CUSTOMER_UPDATE_FIELDS = [
  "addresses",
  "alternateCustomerRef",
  "attributeGroups",
  "dob",
  "email",
  "firstName",
  "joinedStoreId",
  "joinedStoreName",
  "lastName",
  "loyaltyTier",
  "memberSince",
  "mobile",
  "optin_preferences",
  "phone",
  "preferredStore",
  "spendToNextTier",
  "vipStatus"
];
function createTWCClient(options) {
  if (typeof document !== "undefined") {
    throw new TWCError(
      "The TWC client is server-side only: it holds your TWC server credentials, which must never reach a browser.",
      0,
      "browser_not_supported"
    );
  }
  const { tenant, clientId, clientSecret } = options || {};
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
  const customerIds = /* @__PURE__ */ new Map();
  function request(_0, _1, _2) {
    return __async(this, arguments, function* (method, path, label, opts = {}, retried = false) {
      const url = new URL(API_BASE + path);
      const query = opts.query || {};
      for (const key of Object.keys(query)) {
        const value = query[key];
        if (value !== void 0 && value !== "")
          url.searchParams.append(key, String(value));
      }
      const token = yield tokens.get();
      let res;
      try {
        res = yield fetchImpl(url.toString(), {
          method,
          headers: __spreadValues({
            Authorization: `Bearer ${token}`,
            "X-TWC-Tenant": tenant
          }, opts.body !== void 0 ? { "Content-Type": "application/json" } : {}),
          body: opts.body !== void 0 ? JSON.stringify(opts.body) : void 0
        });
      } catch (e) {
        throw new TWCError(`TWC ${label} failed: no response`, 0, "network_error");
      }
      if (res.status === 401 && !retried) {
        tokens.invalidate();
        return request(method, path, label, opts, true);
      }
      if (res.status === 404 && opts.allow404)
        return null;
      if (!res.ok) {
        throw new TWCError(`TWC ${label} failed with ${res.status}`, res.status, codeForStatus(res.status));
      }
      const text = yield res.text();
      if (!text)
        return null;
      try {
        return JSON.parse(text);
      } catch (e) {
        throw new TWCError(`TWC ${label} returned a response that is not JSON`, res.status, "server_error");
      }
    });
  }
  function checkCustomer(customer) {
    if (!customer || typeof customer.customerRef !== "string" || !customer.customerRef.trim() || typeof customer.email !== "string" || !customer.email.trim()) {
      throw invalidArgument("customer needs customerRef and email from the verified session.");
    }
  }
  function checkId(value, name) {
    if (typeof value !== "string" || !value.trim())
      throw invalidArgument(`${name} is required.`);
  }
  const getCustomerByRef2 = (ref) => request("GET", `/customerservice/api/v2/customers/${encodeURIComponent(ref)}/ref`, "GET customers/{customerRef}/ref", { allow404: true });
  const getCustomerByEmail = (email) => request("GET", `/customerservice/api/v2/customers/${encodeURIComponent(email)}/email`, "GET customers/{email}/email", { allow404: true });
  function findCustomer(customer) {
    return __async(this, null, function* () {
      const byRef = yield getCustomerByRef2(customer.customerRef);
      if (byRef)
        return byRef;
      const byEmail = yield getCustomerByEmail(customer.email);
      if (byEmail && (!byEmail.customerRef || byEmail.customerRef === customer.customerRef))
        return byEmail;
      return null;
    });
  }
  function customerId(customer, create) {
    return __async(this, null, function* () {
      const cached = customerIds.get(customer.customerRef);
      if (cached && Date.now() < cached.expiresAt)
        return cached.id;
      const record = create ? yield ensureCustomer(customer) : yield findCustomer(customer);
      if (!record || !record.id)
        return null;
      if (record.customerRef === customer.customerRef) {
        customerIds.set(customer.customerRef, { id: record.id, expiresAt: Date.now() + CUSTOMER_ID_CACHE_MS });
      }
      return record.id;
    });
  }
  function listWishlists(id) {
    return __async(this, null, function* () {
      const data = yield request("GET", "/wsservice/api/wishlists/byCustomer", "GET wishlists/byCustomer", {
        query: { customerId: id, pageSize: WISHLISTS_PAGE_SIZE },
        allow404: true
      });
      return {
        totalItemsAllWishlists: Number(data == null ? void 0 : data.totalItemsAllWishlists) || 0,
        wishlists: Array.isArray(data == null ? void 0 : data.wishlists) ? data.wishlists : []
      };
    });
  }
  function assertOwnsWishlist(customer, wishlistId) {
    return __async(this, null, function* () {
      const id = yield customerId(customer, false);
      if (!id)
        throw notFound("Wishlist");
      const { wishlists } = yield listWishlists(id);
      if (!wishlists.some((w) => w.id === wishlistId))
        throw notFound("Wishlist");
      return id;
    });
  }
  function ownedItem(customer, itemId) {
    return __async(this, null, function* () {
      const item = yield request("GET", `/wsservice/api/wishlist/items/${encodeURIComponent(itemId)}`, "GET wishlist/items/{id}", { allow404: true });
      if (!item || typeof item.wishlistId !== "string")
        throw notFound("Wishlist item");
      yield assertOwnsWishlist(customer, item.wishlistId).catch((e) => {
        throw e instanceof TWCError && e.code === "not_found" ? notFound("Wishlist item") : e;
      });
      return item;
    });
  }
  function ensureCustomer(_0) {
    return __async(this, arguments, function* (customer, details = {}) {
      checkCustomer(customer);
      const byRef = yield getCustomerByRef2(customer.customerRef);
      if (byRef)
        return byRef;
      const byEmail = yield getCustomerByEmail(customer.email);
      if (byEmail) {
        if (byEmail.customerRef && byEmail.customerRef !== customer.customerRef) {
          throw new TWCError("This email belongs to a TWC customer linked to another Shopify customer.", 409, "customer_conflict");
        }
        const body = { id: byEmail.id };
        for (const field of CUSTOMER_UPDATE_FIELDS) {
          if (byEmail[field] !== void 0 && byEmail[field] !== null)
            body[field] = byEmail[field];
        }
        return request("PUT", "/customerservice/api/v2/customers", "PUT customers", {
          query: { customerRef: customer.customerRef },
          body
        });
      }
      return request("POST", "/customerservice/api/v2/customers", "POST customers", {
        body: __spreadValues(__spreadValues({
          email: customer.email,
          customerRef: customer.customerRef
        }, details.firstName ? { firstName: details.firstName } : {}), details.lastName ? { lastName: details.lastName } : {})
      });
    });
  }
  return {
    ensureCustomer,
    /** All of the customer's wishlists, without items. Empty when the customer has no TWC record yet. */
    getWishlists(customer) {
      return __async(this, null, function* () {
        checkCustomer(customer);
        const id = yield customerId(customer, false);
        return id ? listWishlists(id) : { totalItemsAllWishlists: 0, wishlists: [] };
      });
    },
    /** One of the customer's wishlists. */
    getWishlist(customer, wishlistId) {
      return __async(this, null, function* () {
        checkCustomer(customer);
        checkId(wishlistId, "wishlistId");
        yield assertOwnsWishlist(customer, wishlistId);
        return request("GET", "/wsservice/api/wishlists", "GET wishlists", { query: { id: wishlistId } });
      });
    },
    /** One page of items from one of the customer's wishlists. */
    getWishlistItems(_0, _1) {
      return __async(this, arguments, function* (customer, wishlistId, page = {}) {
        checkCustomer(customer);
        checkId(wishlistId, "wishlistId");
        yield assertOwnsWishlist(customer, wishlistId);
        const data = yield request("GET", "/wsservice/api/wishlist/items", "GET wishlist/items", {
          query: { id: wishlistId, pageSize: page.pageSize, lastItemId: page.lastItemId }
        });
        return __spreadValues({
          wishlistItems: Array.isArray(data == null ? void 0 : data.wishlistItems) ? data.wishlistItems : [],
          itemCount: data == null ? void 0 : data.itemCount
        }, (data == null ? void 0 : data.lastEvaluatedItemId) ? { lastEvaluatedItemId: data.lastEvaluatedItemId } : {});
      });
    },
    /** Creates a wishlist for the customer, creating or linking their TWC record first if needed. */
    createWishlist(customer, wishlist) {
      return __async(this, null, function* () {
        checkCustomer(customer);
        checkId(wishlist == null ? void 0 : wishlist.name, "name");
        const id = yield customerId(customer, true);
        return request("POST", "/wsservice/api/wishlists", "POST wishlists", {
          body: __spreadValues(__spreadValues({
            customerId: id,
            name: wishlist.name
          }, wishlist.description !== void 0 ? { description: wishlist.description } : {}), wishlist.isPrivate !== void 0 ? { isPrivate: wishlist.isPrivate } : {})
        });
      });
    },
    renameWishlist(customer, wishlistId, name) {
      return __async(this, null, function* () {
        checkCustomer(customer);
        checkId(wishlistId, "wishlistId");
        checkId(name, "name");
        yield assertOwnsWishlist(customer, wishlistId);
        return request("PUT", "/wsservice/api/wishlists", "PUT wishlists", { body: { id: wishlistId, name } });
      });
    },
    deleteWishlist(customer, wishlistId) {
      return __async(this, null, function* () {
        checkCustomer(customer);
        checkId(wishlistId, "wishlistId");
        yield assertOwnsWishlist(customer, wishlistId);
        yield request("DELETE", "/wsservice/api/wishlists", "DELETE wishlists", { query: { id: wishlistId } });
      });
    },
    /** Adds a product variant to one of the customer's wishlists. */
    addItem(customer, wishlistId, item) {
      return __async(this, null, function* () {
        checkCustomer(customer);
        checkId(wishlistId, "wishlistId");
        checkId(item == null ? void 0 : item.productRef, "productRef");
        checkId(item == null ? void 0 : item.variantRef, "variantRef");
        yield assertOwnsWishlist(customer, wishlistId);
        return request("POST", "/wsservice/api/wishlist/items", "POST wishlist/items", {
          body: __spreadValues(__spreadValues({
            wishlistId,
            product: { productRef: item.productRef, selectedVariantRef: item.variantRef }
          }, item.wishlistItemRef ? { wishlistItemRef: item.wishlistItemRef } : {}), item.attributeGroups !== void 0 ? { attributeGroups: item.attributeGroups } : {})
        });
      });
    },
    /** Changes the selected variant (e.g. size or colour) of an item in one of the customer's wishlists. */
    changeItemVariant(customer, itemId, variantRef) {
      return __async(this, null, function* () {
        var _a2, _b;
        checkCustomer(customer);
        checkId(itemId, "itemId");
        checkId(variantRef, "variantRef");
        const item = yield ownedItem(customer, itemId);
        return request("PUT", "/wsservice/api/wishlist/items", "PUT wishlist/items", {
          body: {
            id: item.id,
            wishlistId: item.wishlistId,
            product: {
              productRef: (_a2 = item.product) == null ? void 0 : _a2.productRef,
              // wsservice reads selectedVariantId without a null check, so it is always sent.
              selectedVariantId: "",
              selectedVariantRef: variantRef,
              oldVariantRef: (_b = item.product) == null ? void 0 : _b.selectedVariantRef
            }
          }
        });
      });
    },
    /** Removes an item from one of the customer's wishlists. */
    removeItem(customer, itemId) {
      return __async(this, null, function* () {
        checkCustomer(customer);
        checkId(itemId, "itemId");
        const item = yield ownedItem(customer, itemId);
        yield request("DELETE", `/wsservice/api/wishlist/items/${encodeURIComponent(item.id)}`, "DELETE wishlist/items/{id}");
      });
    },
    /**
     * A shared wishlist for a share page: the list name and products only. All customer data is
     * removed, and a private or deleted wishlist is not found.
     */
    getSharedWishlist(_0) {
      return __async(this, arguments, function* (wishlistId, page = {}) {
        checkId(wishlistId, "wishlistId");
        const wishlist = yield request("GET", "/wsservice/api/wishlists", "GET wishlists", { query: { id: wishlistId }, allow404: true });
        if (!wishlist || wishlist.deleted === true || wishlist.isPrivate === true)
          throw notFound("Wishlist");
        const data = yield request("GET", "/wsservice/api/wishlist/items", "GET wishlist/items", {
          query: { id: wishlistId, pageSize: page.pageSize, lastItemId: page.lastItemId }
        });
        const items = Array.isArray(data == null ? void 0 : data.wishlistItems) ? data.wishlistItems : [];
        return __spreadValues({
          name: typeof wishlist.name === "string" ? wishlist.name : "",
          items: items.map((i) => {
            var _a2, _b, _c, _d;
            return {
              productRef: (_b = (_a2 = i == null ? void 0 : i.product) == null ? void 0 : _a2.productRef) != null ? _b : null,
              variantRef: (_d = (_c = i == null ? void 0 : i.product) == null ? void 0 : _c.selectedVariantRef) != null ? _d : null
            };
          })
        }, (data == null ? void 0 : data.lastEvaluatedItemId) ? { lastItemId: data.lastEvaluatedItemId } : {});
      });
    },
    /**
     * Registers a Notify Me (back in stock) or Coming Soon interest. For a logged-in customer, pass
     * the session's email, not one from the form. Protect your sign-up endpoint against abuse.
     */
    registerInterest(signup) {
      return __async(this, null, function* () {
        checkId(signup == null ? void 0 : signup.email, "email");
        checkId(signup == null ? void 0 : signup.variantRef, "variantRef");
        if (signup.kind !== "notifyMe" && signup.kind !== "comingSoon") {
          throw invalidArgument('kind must be "notifyMe" or "comingSoon".');
        }
        const _a2 = signup, { kind } = _a2, fields = __objRest(_a2, ["kind"]);
        return request("POST", "/wsservice/api/wishlist/items/customerInterest", "POST wishlist/items/customerInterest", {
          body: __spreadProps(__spreadValues({}, fields), { [kind]: true })
        });
      });
    },
    /** The customer's Notify Me / Coming Soon interests (a wishlist with items), or null if none. */
    getInterests(customer) {
      return __async(this, null, function* () {
        checkCustomer(customer);
        return request("GET", `/wsservice/api/wishlist/items/customerInterest/${encodeURIComponent(customer.email)}`, "GET wishlist/items/customerInterest/{email}", { allow404: true });
      });
    },
    /** Cancels one of the customer's interests in a variant. */
    cancelInterest(customer, variantRef, kind) {
      return __async(this, null, function* () {
        checkCustomer(customer);
        checkId(variantRef, "variantRef");
        if (kind !== "notifyMe" && kind !== "comingSoon")
          throw invalidArgument('kind must be "notifyMe" or "comingSoon".');
        const id = yield customerId(customer, false);
        if (!id)
          throw notFound("Interest");
        yield request("DELETE", "/wsservice/api/wishlist/items/customerInterest", "DELETE wishlist/items/customerInterest", {
          query: { customerId: id, variantRef, isNotifyMe: String(kind === "notifyMe") }
        });
      });
    }
  };
}
function resolveToken(token) {
  return __async(this, null, function* () {
    if (token)
      return token;
    {
      throw new Error(
        "TWC SDK: no token provided. Pass an access token from your TWC server API client as `token`."
      );
    }
  });
}

// src/axios/AxiosInstance.ts
var axiosInstance = axios__default.default.create({
  baseURL: "https://api.au-aws.thewishlist.io/services"
});
axiosInstance.interceptors.response.use(void 0, (error) => __async(void 0, null, function* () {
  var _a;
  const config2 = error.config;
  if (((_a = error.response) == null ? void 0 : _a.status) !== 401 || !config2 || config2._twcRetried) {
    return Promise.reject(error);
  }
  {
    return Promise.reject(error);
  }
}));

// src/wishlistService/getWishlist.ts
function getWishlist(obj) {
  const params = new URLSearchParams();
  obj.wishlistID && params.append("id", obj.wishlistID);
  obj.wishlistRef && params.append("wishlistRef", obj.wishlistRef);
  if (obj.pageSize)
    params.append("pageSize", obj.pageSize);
  if (obj.lastItemId)
    params.append("lastItemId", obj.lastItemId);
  resolveToken(obj.token).then((token) => {
    return axiosInstance.get(`/wsservice/api/wishlists?${params.toString()}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "X-TWC-Tenant": obj.tenant
      }
    });
  }).then((response) => {
    obj.onSuccess(response.data);
  }).catch((error) => {
    obj.onError((error == null ? void 0 : error.response) || error);
  });
}

// src/wishlistService/getWishlistItemByID.ts
function getWishlistItemByID(obj) {
  resolveToken(obj.token).then((token) => {
    return axiosInstance.get(
      `/wsservice/api/wishlist/items/${obj.wishlistItemID}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "X-TWC-Tenant": obj.tenant
        }
      }
    );
  }).then((response) => {
    obj.onSuccess(response.data);
  }).catch((error) => {
    obj.onError((error == null ? void 0 : error.response) || error);
  });
}

// src/wishlistService/getWishlistItemByRef.ts
function getWishlistItemByRef(obj) {
  resolveToken(obj.token).then((token) => {
    return axiosInstance.get(
      `/wsservice/api/wishlist/items/ref/${obj.wishlistItemRef}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "X-TWC-Tenant": obj.tenant
        }
      }
    );
  }).then((response) => {
    obj.onSuccess(response.data);
  }).catch((error) => {
    obj.onError((error == null ? void 0 : error.response) || error);
  });
}

// src/wishlistService/getWishlistItems.ts
function getWishlistItems(obj) {
  const params = new URLSearchParams();
  obj.wishlistID && params.append("id", obj.wishlistID);
  obj.wishlistRef && params.append("wishlistRef", obj.wishlistRef);
  if (obj.pageSize)
    params.append("pageSize", obj.pageSize);
  if (obj.lastItemId)
    params.append("lastItemId", obj.lastItemId);
  resolveToken(obj.token).then((token) => {
    return axiosInstance.get(
      `/wsservice/api/wishlist/items?${params.toString()}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "X-TWC-Tenant": obj.tenant
        }
      }
    );
  }).then((response) => {
    obj.onSuccess(response.data);
  }).catch((error) => {
    obj.onError((error == null ? void 0 : error.response) || error);
  });
}

// src/wishlistService/getWishlistsByCustomer.ts
function getWishlistsByCustomer(obj) {
  if (!obj.customerID && !obj.customerRef && !obj.email) {
    obj.onError(new Error("One of customerID, customerRef or email must be defined."));
    return;
  }
  const params = new URLSearchParams();
  obj.customerID && params.append("customerId", obj.customerID);
  obj.customerRef && params.append("customerRef", obj.customerRef);
  obj.email && params.append("email", obj.email);
  if (obj.pageSize)
    params.append("pageSize", obj.pageSize.toString());
  if (obj.lastItemId)
    params.append("lastItemId", obj.lastItemId);
  resolveToken(obj.token).then((token) => {
    return axiosInstance.get(
      `/wsservice/api/wishlists/byCustomer?${params.toString()}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "X-TWC-Tenant": obj.tenant
        }
      }
    );
  }).then((response) => {
    obj.onSuccess(response.data);
  }).catch((error) => {
    obj.onError((error == null ? void 0 : error.response) || error);
  });
}

// src/wishlistService/createWishlistItem.ts
function createWishlistItem(obj) {
  resolveToken(obj.token).then((token) => {
    return axiosInstance.post(
      `/wsservice/api/wishlist/items`,
      obj.createWishlistItembody,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "X-TWC-Tenant": obj.tenant
        }
      }
    );
  }).then((response) => {
    obj.onSuccess(response.data);
  }).catch((error) => {
    obj.onError((error == null ? void 0 : error.response) || error);
  });
}

// src/wishlistService/createWishlist.ts
function createWishlist(obj) {
  resolveToken(obj.token).then((token) => {
    return axiosInstance.post(`/wsservice/api/wishlists`, obj.newWishlistBody, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "X-TWC-Tenant": obj.tenant
      }
    });
  }).then((response) => {
    obj.onSuccess(response.data);
  }).catch((error) => {
    obj.onError((error == null ? void 0 : error.response) || error);
  });
}

// src/wishlistService/updateWishlist.ts
function updateWishlist(obj) {
  resolveToken(obj.token).then((token) => {
    return axiosInstance.put(
      `/wsservice/api/wishlists`,
      obj.updateWishlistBody,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "X-TWC-Tenant": obj.tenant
        }
      }
    );
  }).then((response) => {
    obj.onSuccess(response.data);
  }).catch((error) => {
    obj.onError((error == null ? void 0 : error.response) || error);
  });
}

// src/wishlistService/updateWishlistItem.ts
function updateWishlistItem(obj) {
  resolveToken(obj.token).then((token) => {
    return axiosInstance.put(
      `/wsservice/api/wishlist/items`,
      obj.updateWishlistItemBody,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "X-TWC-Tenant": obj.tenant
        }
      }
    );
  }).then((response) => {
    obj.onSuccess(response.data);
  }).catch((error) => {
    obj.onError((error == null ? void 0 : error.response) || error);
  });
}

// src/wishlistService/deleteWishlistItemByID.ts
function deleteWishlistItemByID(obj) {
  resolveToken(obj.token).then((token) => {
    return axiosInstance.delete(
      `/wsservice/api/wishlist/items/${obj.wishlistItemID}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "X-TWC-Tenant": obj.tenant
        }
      }
    );
  }).then((response) => {
    obj.onSuccess(response.data);
  }).catch((error) => {
    obj.onError((error == null ? void 0 : error.response) || error);
  });
}

// src/wishlistService/deleteWishlistItemByRef.ts
function deleteWishlistItemByRef(obj) {
  resolveToken(obj.token).then((token) => {
    return axiosInstance.delete(
      `/wsservice/api/wishlist/items/${obj.wishlistItemRef}/ref`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "X-TWC-Tenant": obj.tenant
        }
      }
    );
  }).then((response) => {
    obj.onSuccess(response.data);
  }).catch((error) => {
    obj.onError((error == null ? void 0 : error.response) || error);
  });
}

// src/wishlistService/deleteWishlist.ts
function deleteWishlist(obj) {
  const params = new URLSearchParams();
  obj.wishlistID && params.append("id", obj.wishlistID);
  obj.wishlistRef && params.append("wishlistRef", obj.wishlistRef);
  resolveToken(obj.token).then((token) => {
    return axiosInstance.delete(
      `/wsservice/api/wishlists?${params.toString()}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "X-TWC-Tenant": obj.tenant
        }
      }
    );
  }).then((response) => {
    obj.onSuccess(response.data);
  }).catch((error) => {
    obj.onError((error == null ? void 0 : error.response) || error);
  });
}

// src/wishlistService/getItemsPopularity.ts
function getItemsPopularity(obj) {
  resolveToken(obj.token).then((token) => {
    return axiosInstance.post(
      `/wsservice/api/wishlists/itemPopularity`,
      obj.itemsPopularityBody,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "X-TWC-Tenant": obj.tenant
        }
      }
    );
  }).then((response) => {
    obj.onSuccess(response.data);
  }).catch((error) => {
    obj.onError((error == null ? void 0 : error.response) || error);
  });
}

// src/customerService/getCustomerByID.ts
function getCustomerByID(obj) {
  resolveToken(obj.token).then((token) => {
    return axiosInstance.get(
      `/customerservice/api/v2/customers/${obj.customerID}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "X-TWC-Tenant": obj.tenant
        }
      }
    );
  }).then((response) => {
    obj.onSuccess(response.data);
  }).catch((error) => {
    obj.onError((error == null ? void 0 : error.response) || error);
  });
}

// src/customerService/getCusotmerByRef.ts
function getCustomerByRef(obj) {
  resolveToken(obj.token).then((token) => {
    return axiosInstance.get(
      `/customerservice/api/v2/customers/${obj.customerRef}/ref`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "X-TWC-Tenant": obj.tenant
        }
      }
    );
  }).then((response) => {
    obj.onSuccess(response.data);
  }).catch((error) => {
    obj.onError((error == null ? void 0 : error.response) || error);
  });
}

// src/customerService/createCustomer.ts
function createCustomer(obj) {
  resolveToken(obj.token).then((token) => {
    return axiosInstance.post(
      `/customerservice/api/v2/customers/`,
      obj.createCustomerBody,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "X-TWC-Tenant": obj.tenant
        }
      }
    );
  }).then((response) => {
    obj.onSuccess(response.data);
  }).catch((error) => {
    obj.onError((error == null ? void 0 : error.response) || error);
  });
}

// src/customerService/updateCustomerByID.ts
function updateCustomerByID(obj) {
  resolveToken(obj.token).then((token) => {
    return axiosInstance.put(
      `/customerservice/api/v2/customers/id=${obj.customerID}`,
      obj.updateCustomerBody,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "X-TWC-Tenant": obj.tenant
        }
      }
    );
  }).then((response) => {
    obj.onSuccess(response.data);
  }).catch((error) => {
    obj.onError((error == null ? void 0 : error.response) || error);
  });
}

// src/customerService/updateCustomer.ts
function updateCustomer(obj) {
  resolveToken(obj.token).then((token) => {
    return axiosInstance.put(
      `/customerservice/api/v2/customers`,
      obj.updateCustomerBody,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "X-TWC-Tenant": obj.tenant
        }
      }
    );
  }).then((response) => {
    obj.onSuccess(response.data);
  }).catch((error) => {
    obj.onError((error == null ? void 0 : error.response) || error);
  });
}

exports.TWCError = TWCError;
exports.createCustomer = createCustomer;
exports.createTWCClient = createTWCClient;
exports.createWishlist = createWishlist;
exports.createWishlistItem = createWishlistItem;
exports.deleteWishlist = deleteWishlist;
exports.deleteWishlistItemByID = deleteWishlistItemByID;
exports.deleteWishlistItemByRef = deleteWishlistItemByRef;
exports.getCustomerByID = getCustomerByID;
exports.getCustomerByRef = getCustomerByRef;
exports.getItemsPopularity = getItemsPopularity;
exports.getWishlist = getWishlist;
exports.getWishlistItemByID = getWishlistItemByID;
exports.getWishlistItemByRef = getWishlistItemByRef;
exports.getWishlistItems = getWishlistItems;
exports.getWishlistsByCustomer = getWishlistsByCustomer;
exports.updateCustomer = updateCustomer;
exports.updateCustomerByID = updateCustomerByID;
exports.updateWishlist = updateWishlist;
exports.updateWishlistItem = updateWishlistItem;
