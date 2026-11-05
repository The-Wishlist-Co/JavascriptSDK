interface TWCClientOptions {
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
interface Customer {
    /** The Shopify customer ID. */
    customerRef: string;
    /** The customer's email address. */
    email: string;
}
interface WishlistSummary {
    id: string;
    name?: string;
    itemCount?: number;
    [field: string]: unknown;
}
interface CustomerWishlists {
    totalItemsAllWishlists: number;
    wishlists: WishlistSummary[];
}
interface WishlistItemsPage {
    wishlistItems: Record<string, any>[];
    itemCount?: number;
    /** Pass as `lastItemId` to get the next page; absent on the last page. */
    lastEvaluatedItemId?: string;
}
interface SharedWishlist {
    name: string;
    items: {
        productRef: string | null;
        variantRef: string | null;
    }[];
    /** Pass as `lastItemId` to get the next page; absent on the last page. */
    lastItemId?: string;
}
type InterestKind = "notifyMe" | "comingSoon";
interface InterestSignup {
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
/**
 * Creates a TWC client for server-side code. It requests and refreshes its own access token
 * and offers operations scoped to one shopper: every operation on a wishlist or item first
 * checks it belongs to the customer you pass, and returns not-found if it doesn't.
 *
 * Throws if created in a browser: the client holds your server credentials.
 */
declare function createTWCClient(options: TWCClientOptions): {
    ensureCustomer: (customer: Customer, details?: {
        firstName?: string;
        lastName?: string;
    }) => Promise<Record<string, any>>;
    /** All of the customer's wishlists, without items. Empty when the customer has no TWC record yet. */
    getWishlists(customer: Customer): Promise<CustomerWishlists>;
    /** One of the customer's wishlists. */
    getWishlist(customer: Customer, wishlistId: string): Promise<Record<string, any>>;
    /** One page of items from one of the customer's wishlists. */
    getWishlistItems(customer: Customer, wishlistId: string, page?: {
        pageSize?: number;
        lastItemId?: string;
    }): Promise<WishlistItemsPage>;
    /** Creates a wishlist for the customer, creating or linking their TWC record first if needed. */
    createWishlist(customer: Customer, wishlist: {
        name: string;
        description?: string;
        isPrivate?: boolean;
    }): Promise<Record<string, any>>;
    renameWishlist(customer: Customer, wishlistId: string, name: string): Promise<Record<string, any>>;
    deleteWishlist(customer: Customer, wishlistId: string): Promise<void>;
    /** Adds a product variant to one of the customer's wishlists. */
    addItem(customer: Customer, wishlistId: string, item: {
        productRef: string;
        variantRef: string;
        wishlistItemRef?: string;
        attributeGroups?: unknown;
    }): Promise<Record<string, any>>;
    /** Changes the selected variant (e.g. size or colour) of an item in one of the customer's wishlists. */
    changeItemVariant(customer: Customer, itemId: string, variantRef: string): Promise<Record<string, any>>;
    /** Removes an item from one of the customer's wishlists. */
    removeItem(customer: Customer, itemId: string): Promise<void>;
    /**
     * A shared wishlist for a share page: the list name and products only. All customer data is
     * removed, and a private or deleted wishlist is not found.
     */
    getSharedWishlist(wishlistId: string, page?: {
        pageSize?: number;
        lastItemId?: string;
    }): Promise<SharedWishlist>;
    /**
     * Registers a Notify Me (back in stock) or Coming Soon interest. For a logged-in customer, pass
     * the session's email, not one from the form. Protect your sign-up endpoint against abuse.
     */
    registerInterest(signup: InterestSignup): Promise<unknown>;
    /** The customer's Notify Me / Coming Soon interests (a wishlist with items), or null if none. */
    getInterests(customer: Customer): Promise<Record<string, any> | null>;
    /** Cancels one of the customer's interests in a variant. */
    cancelInterest(customer: Customer, variantRef: string, kind: InterestKind): Promise<void>;
};
type TWCClient = ReturnType<typeof createTWCClient>;

/**
 * The one error type the TWC client throws.
 *
 * It carries the HTTP status, a short code and a message naming the operation. It never
 * carries the client secret, tokens, request or response bodies, or values from the URL
 * (an email can be part of a TWC path), so it is safe to log.
 */
declare class TWCError extends Error {
    /** HTTP status from TWC, or 0 when no response was received. */
    readonly status: number;
    /** One of: bad_request, unauthorized, forbidden, not_found, conflict, rate_limited, server_error, network_error, invalid_argument, customer_conflict, browser_not_supported, auth_failed. */
    readonly code: string;
    constructor(message: string, status: number, code: string);
}

/**
 * Retrieves the wishlist data based on the provided parameters.
 *
 * @group wishlistService
 * @param obj - The configuration object.
 * @param obj.wishlistID - The ID of the wishlist to retrieve (either wishlistID or wishlistRef must be defined).
 * @param obj.wishlistRef - The reference of the wishlist to retrieve (either wishlistID or wishlistRef must be defined).
 * @param obj.pageSize - The number of items per page to retrieve.
 * @param obj.lastItemId - The ID of the last item retrieved.
 * @param obj.token - An access token from your TWC server API client. Keep it on your server; never send it to a browser.
 * @param obj.tenant - The tenant identifier.
 * @param obj.onSuccess - The callback function to handle the successful response.
 * @param obj.onError - The callback function to handle any errors.
 */
declare function getWishlist(obj: {
    wishlistID?: string;
    wishlistRef?: string;
    pageSize?: string;
    lastItemId?: string;
    token: string;
    tenant: string;
    onSuccess: (response: any) => void;
    onError: (error: any) => void;
}): void;

/**
 * Retrieves a wishlist item by its ID.
 *
 * @group wishlistService
 * @param obj - The configuration object.
 * @param obj.wishlistItemID - The ID of the wishlist item to retrieve.
 * @param obj.token - An access token from your TWC server API client. Keep it on your server; never send it to a browser.
 * @param obj.tenant - The tenant identifier.
 * @param obj.onSuccess - The callback function to be called when the request is successful.
 * @param obj.onError - The callback function to be called when an error occurs.
 */
declare function getWishlistItemByID(obj: {
    wishlistItemID: string;
    token: string;
    tenant: string;
    onSuccess: (response: any) => void;
    onError: (error: any) => void;
}): void;

/**
 * Retrieves a wishlist item by its reference.
 *
 * @group wishlistService
 * @param obj - The configuration object.
 * @param obj.wishlistItemRef - The reference of the wishlist item to retrieve.
 * @param obj.token - An access token from your TWC server API client. Keep it on your server; never send it to a browser.
 * @param obj.tenant - The tenant identifier.
 * @param obj.onSuccess - The callback function to be called when the request is successful.
 * @param obj.onError - The callback function to be called when an error occurs.
 */
declare function getWishlistItemByRef(obj: {
    wishlistItemRef: string;
    token: string;
    tenant: string;
    onSuccess: (response: any) => void;
    onError: (error: any) => void;
}): void;

/**
 * Retrieves wishlist items based on the provided parameters.
 *
 * @group wishlistService
 * @param obj - The configuration object.
 * @param obj.wishlistID - The ID of the wishlist (either wishlistID or wishlistRef must be defined).
 * @param obj.wishlistRef - The reference of the wishlist (either wishlistID or wishlistRef must be defined).
 * @param obj.pageSize - The number of items to retrieve per page.
 * @param obj.lastItemId - The ID of the last item retrieved.
 * @param obj.token - An access token from your TWC server API client. Keep it on your server; never send it to a browser.
 * @param obj.tenant - The tenant information.
 * @param obj.onSuccess - The callback function to handle successful response.
 * @param obj.onError - The callback function to handle error response.
 */
declare function getWishlistItems(obj: {
    wishlistID?: string;
    wishlistRef?: string;
    pageSize?: string;
    lastItemId?: string;
    token: string;
    tenant: string;
    onSuccess: (response: any) => void;
    onError: (error: any) => void;
}): void;

/**
 * Retrieves all wishlists for a customer, without their items. The response includes
 * `totalItemsAllWishlists` and each wishlist's details; use {@link getWishlistItems} to load
 * the items for the wishlist the customer opens.
 *
 * @group wishlistService
 * @param obj - The configuration object.
 * @param obj.customerID - The TWC ID of the customer (one of customerID, customerRef or email must be defined).
 * @param obj.customerRef - The customer reference, i.e. the Shopify customer ID (one of customerID, customerRef or email must be defined).
 * @param obj.email - The customer's email (one of customerID, customerRef or email must be defined).
 * @param obj.pageSize - The number of wishlists to retrieve per page.
 * @param obj.lastItemId - The ID of the last wishlist retrieved.
 * @param obj.token - An access token from your TWC server API client. Keep it on your server; never send it to a browser.
 * @param obj.tenant - The tenant identifier.
 * @param obj.onSuccess - The callback function to handle a successful response.
 * @param obj.onError - The callback function to handle an error response.
 */
declare function getWishlistsByCustomer(obj: {
    customerID?: string;
    customerRef?: string;
    email?: string;
    pageSize?: number;
    lastItemId?: string;
    token: string;
    tenant: string;
    onSuccess: (response: any) => void;
    onError: (error: any) => void;
}): void;

/**
 * Creates a wishlist item.
 *
 * @group wishlistService
 * @param obj - The configuration object.
 * @param obj.createWishlistItembody - The body of the wishlist item to be created. See https://the-wishlist-co.github.io/docs/wishlistSvcAPI.html#create-a-wishlist-item for information on the fields.
 * @param obj.token - An access token from your TWC server API client. Keep it on your server; never send it to a browser.
 * @param obj.tenant - The tenant identifier.
 * @param obj.onSuccess - The callback function to be called on successful creation of the wishlist item.
 * @param obj.onError - The callback function to be called on error during the creation of the wishlist item.
 */
declare function createWishlistItem(obj: {
    createWishlistItembody: {
        [key: string]: any;
    };
    token: string;
    tenant: string;
    onSuccess: (response: any) => void;
    onError: (error: any) => void;
}): void;

/**
 * Creates a new wishlist.
 *
 * @group wishlistService
 * @param obj - The configuration object.
 * @param obj.newWishlistBody - The body of the new wishlist. See https://the-wishlist-co.github.io/docs/wishlistSvcAPI.html#ceate-a-wishlist for information on the fields.
 * @param obj.token - An access token from your TWC server API client. Keep it on your server; never send it to a browser.
 * @param obj.tenant - The tenant identifier.
 * @param obj.onSuccess - The callback function to be called on successful creation.
 * @param obj.onError - The callback function to be called on error.
 */
declare function createWishlist(obj: {
    newWishlistBody: {
        [key: string]: any;
    };
    token: string;
    tenant: string;
    onSuccess: (response: any) => void;
    onError: (error: any) => void;
}): void;

/**
 * Updates a wishlist.
 *
 * @group wishlistService
 * @param obj - The configuration object.
 * @param obj.updateWishlistBody - The body of the wishlist update request. See https://the-wishlist-co.github.io/docs/wishlistSvcAPI.html#update-wishlist-by-either-id-or-ref for information on the fields.
 * @param obj.token - An access token from your TWC server API client. Keep it on your server; never send it to a browser.
 * @param obj.tenant - The tenant identifier.
 * @param obj.onSuccess - The callback function to be called on successful update.
 * @param obj.onError - The callback function to be called on error.
 */
declare function updateWishlist(obj: {
    updateWishlistBody: {
        [key: string]: any;
    };
    token: string;
    tenant: string;
    onSuccess: (response: any) => void;
    onError: (error: any) => void;
}): void;

/**
 * Updates a wishlist item.
 *
 * @group wishlistService
 * @param obj - The configuration object.
 * @param obj.updateWishlistItemBody - The body of the request containing the updated wishlist item data. See https://the-wishlist-co.github.io/docs/wishlistSvcAPI.html#update-a-wishlist-item-by-wishlist-item-id for information on the fields.
 * @param obj.token - An access token from your TWC server API client. Keep it on your server; never send it to a browser.
 * @param obj.tenant - The tenant identifier.
 * @param obj.onSuccess - The callback function to be called when the update is successful.
 * @param obj.onError - The callback function to be called when an error occurs during the update.
 */
declare function updateWishlistItem(obj: {
    updateWishlistItemBody: {
        [key: string]: any;
    };
    token: string;
    tenant: string;
    onSuccess: (response: any) => void;
    onError: (error: any) => void;
}): void;

/**
 * Deletes a wishlist item by ID.
 *
 * @group wishlistService
 * @param obj - The configuration object.
 * @param obj.wishlistItemID - The ID of the wishlist item to delete.
 * @param obj.token - An access token from your TWC server API client. Keep it on your server; never send it to a browser.
 * @param obj.tenant - The tenant.
 * @param obj.onSuccess - The callback function to be called on successful deletion.
 * @param obj.onError - The callback function to be called on error.
 */
declare function deleteWishlistItemByID(obj: {
    wishlistItemID: string;
    token: string;
    tenant: string;
    onSuccess: (response: any) => void;
    onError: (error: any) => void;
}): void;

/**
 * Deletes a wishlist item by its reference.
 *
 * @group wishlistService
 * @param obj - The configuration object.
 * @param obj.wishlistItemRef - The reference of the wishlist item to delete.
 * @param obj.token - An access token from your TWC server API client. Keep it on your server; never send it to a browser.
 * @param obj.tenant - The tenant identifier.
 * @param obj.onSuccess - The callback function to be called on successful deletion.
 * @param obj.onError - The callback function to be called on error.
 */
declare function deleteWishlistItemByRef(obj: {
    wishlistItemRef: string;
    token: string;
    tenant: string;
    onSuccess: (response: any) => void;
    onError: (error: any) => void;
}): void;

/**
 * Deletes a wishlist by either ID or Ref.
 *
 * @group wishlistService
 * @param obj - The configuration object.
 * @param obj.wishlistID - The ID of the wishlist to delete (either wishlistID or wishlistRef must be defined).
 * @param obj.wishlistRef - The reference of the wishlist to delete (either wishlistID or wishlistRef must be defined).
 * @param obj.token - An access token from your TWC server API client. Keep it on your server; never send it to a browser.
 * @param obj.tenant - The tenant identifier.
 * @param obj.onSuccess - The callback function to be called when the deletion is successful.
 * @param obj.onError - The callback function to be called when an error occurs during deletion.
 */
declare function deleteWishlist(obj: {
    wishlistID?: string;
    wishlistRef?: string;
    token: string;
    tenant: string;
    onSuccess: (response: any) => void;
    onError: (error: any) => void;
}): void;

/**
 * Show a count of the number of times an item has been wishlisted.
 *
 * @group wishlistService
 * @param obj - The configuration object.
 * @param obj.itemsPopularityBody - The array of product or variant refs to get statistic. See https://the-wishlist-co.github.io/docs/wishlistSvcAPI.html#update-a-wishlist-item-by-wishlist-item-id for information on the fields.
 * @param obj.token - An access token from your TWC server API client. Keep it on your server; never send it to a browser.
 * @param obj.tenant - The tenant identifier.
 * @param obj.onSuccess - The callback function to be called when the update is successful.
 * @param obj.onError - The callback function to be called when an error occurs during the update.
 */
declare function getItemsPopularity(obj: {
    itemsPopularityBody: {
        [key: string]: any;
    };
    token: string;
    tenant: string;
    onSuccess: (response: any) => void;
    onError: (error: any) => void;
}): void;

/**
 * Retrieves customer information by ID.
 *
 * @group customerService
 * @param obj - The configuration object.
 * @param obj.customerID - The ID of the customer to retrieve.
 * @param obj.token - An access token from your TWC server API client. Keep it on your server; never send it to a browser.
 * @param obj.tenant - The tenant identifier.
 * @param obj.onSuccess - The callback function to handle the successful response.
 * @param obj.onError - The callback function to handle any errors.
 */
declare function getCustomerByID(obj: {
    customerID: string;
    token: string;
    tenant: string;
    onSuccess: (response: any) => void;
    onError: (error: any) => void;
}): void;

/**
 * Retrieves customer information by customer reference.
 *
 * @group customerService
 * @param obj - The configuration object.
 * @param obj.customerRef - The customer reference.
 * @param obj.token - An access token from your TWC server API client. Keep it on your server; never send it to a browser.
 * @param obj.tenant - The tenant identifier.
 * @param obj.onSuccess - The callback function to handle the successful response.
 * @param obj.onError - The callback function to handle any errors.
 */
declare function getCustomerByRef(obj: {
    customerRef: string;
    token: string;
    tenant: string;
    onSuccess: (response: any) => void;
    onError: (error: any) => void;
}): void;

/**
 * Creates a new customer.
 *
 * @group customerService
 * @param obj - The configuration object.
 * @param obj.createCustomerBody - The body of the request containing the customer data. See https://the-wishlist-co.github.io/docs/customersvcApi.html#create-a-customer for information on the fields.
 * @param obj.token - An access token from your TWC server API client. Keep it on your server; never send it to a browser.
 * @param obj.tenant - The tenant identifier.
 * @param obj.onSuccess - The callback function to be called when the request is successful.
 * @param obj.onError - The callback function to be called when an error occurs.
 */
declare function createCustomer(obj: {
    createCustomerBody: {
        [key: string]: any;
    };
    token: string;
    tenant: string;
    onSuccess: (response: any) => void;
    onError: (error: any) => void;
}): void;

/**
 * Updates a customer by their ID.
 *
 * @group customerService
 * @param obj - The configuration object.
 * @param obj.customerID - The ID of the customer to update.
 * @param obj.updateCustomerBody - The updated customer data. See https://the-wishlist-co.github.io/docs/customersvcApi.html#update for information on the fields.
 * @param obj.token - An access token from your TWC server API client. Keep it on your server; never send it to a browser.
 * @param obj.tenant - The tenant ID.
 * @param obj.onSuccess - The callback function to be called on successful update.
 * @param obj.onError - The callback function to be called on error.
 */
declare function updateCustomerByID(obj: {
    customerID: string;
    updateCustomerBody: {
        [key: string]: any;
    };
    token: string;
    tenant: string;
    onSuccess: (response: any) => void;
    onError: (error: any) => void;
}): void;

/**
 * Updates a customer using the provided data.
 *
 * @group customerService
 * @param obj - The configuration object.
 * @param obj.updateCustomerBody - The data to be sent in the request body for updating the customer. See https://the-wishlist-co.github.io/docs/customersvcApi.html#update for information on the fields.
 * @param obj.token - An access token from your TWC server API client. Keep it on your server; never send it to a browser.
 * @param obj.tenant - The tenant identifier for the request.
 * @param obj.onSuccess - The callback function to be executed when the request is successful.
 * @param obj.onError - The callback function to be executed when an error occurs during the request.
 */
declare function updateCustomer(obj: {
    updateCustomerBody: {
        [key: string]: any;
    };
    token: string;
    tenant: string;
    onSuccess: (response: any) => void;
    onError: (error: any) => void;
}): void;

export { type Customer, type CustomerWishlists, type InterestKind, type InterestSignup, type SharedWishlist, type TWCClient, type TWCClientOptions, TWCError, type WishlistItemsPage, type WishlistSummary, createCustomer, createTWCClient, createWishlist, createWishlistItem, deleteWishlist, deleteWishlistItemByID, deleteWishlistItemByRef, getCustomerByID, getCustomerByRef, getItemsPopularity, getWishlist, getWishlistItemByID, getWishlistItemByRef, getWishlistItems, getWishlistsByCustomer, updateCustomer, updateCustomerByID, updateWishlist, updateWishlistItem };
