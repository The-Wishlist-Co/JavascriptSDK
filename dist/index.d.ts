interface TWCConfig {
    shopDomain: string;
    /**
     * Tenant feature flag for guest (anonymous) wishlists. When `false`,
     * {@link getOrCreateAnonymous} and {@link mergeOnLogin} are silent no-ops.
     * Defaults to `true`.
     */
    anonymousWishlistEnabled?: boolean;
}
/**
 * Initializes the TWC SDK for Shopify proxy-based authentication.
 * Call this once (e.g. on page load) before using any SDK functions without a token.
 *
 * @param cfg - Configuration object.
 * @param cfg.shopDomain - The Shopify store domain (e.g. "mystore.myshopify.com"),
 *   used to construct the proxy URL: https://{shopDomain}/apps/twc-sdk/auth/token
 * @param cfg.anonymousWishlistEnabled - Tenant feature flag for guest wishlists.
 *   Defaults to `true`; set `false` to make the anonymous functions no-ops.
 */
declare function initTWC(cfg: TWCConfig): void;

/**
 * Resolves an authentication token for TWC API calls.
 *
 * - If a token is provided directly, it is returned as-is (zero overhead).
 * - If no token is provided, fetches one from the Shopify App Proxy
 *   configured via {@link initTWC}. The proxy token is cached client-side
 *   to avoid repeated network calls.
 *
 * Concurrent calls that miss the cache share a single proxy request.
 *
 * @param token - An explicit bearer token. When supplied, proxy auth is bypassed.
 * @returns A promise that resolves to a valid access token string.
 * @throws If no token is provided and `initTWC` has not been called.
 * @throws If the proxy request fails or returns an unsuccessful response.
 */
declare function resolveToken(token?: string): Promise<string>;
/**
 * Drops the cached proxy token so the next {@link resolveToken} call re-requests it.
 *
 * No refresh-token flow exists, so expiry is handled by re-requesting: the axios
 * response interceptor calls this on a 401 and retries the failed call once.
 */
declare function invalidateToken(): void;

/**
 * Retrieves a wishlist by its ID.
 *
 * @group wishlistService
 * @param obj - The configuration object.
 * @param obj.pageSize - The number of items per page.
 * @param obj.lastItemId - The ID of the last item.
 * @param obj.wishlistID - The ID of the wishlist.
 * @param obj.token - The authentication token. If omitted, the SDK will use proxy auth (requires {@link initTWC}).
 * @param obj.tenant - The tenant.
 * @param obj.onSuccess - The callback function to handle the successful response.
 * @param obj.onError - The callback function to handle the error response.
 */
declare function getWishlistByID(obj: {
    pageSize?: number;
    lastItemId?: string;
    wishlistID: string;
    token?: string;
    tenant: string;
    onSuccess: (response: any) => void;
    onError: (error: any) => void;
}): void;

/**
 * Retrieves the wishlist for a specific customer ID.
 *
 * @group wishlistService
 * @param obj - The configuration object.
 * @param obj.pageSize - The number of items to retrieve per page (default: 10).
 * @param obj.lastItemId - The ID of the last item retrieved.
 * @param obj.customerID - The ID of the customer.
 * @param obj.token - The authentication token. If omitted, the SDK will use proxy auth (requires {@link initTWC}).
 * @param obj.tenant - The tenant ID.
 * @param obj.onSuccess - The callback function to handle the successful response.
 * @param obj.onError - The callback function to handle any errors.
 */
declare function getWishlistByCustomerID(obj: {
    pageSize?: number;
    lastItemId?: string;
    customerID: any;
    token?: string;
    tenant: string;
    onSuccess: (response: any) => void;
    onError: (error: any) => void;
}): void;

/**
 * Retrieves the wishlist for a customer based on the customer reference.
 *
 * @group wishlistService
 * @param obj - The configuration object.
 * @param obj.pageSize - The number of items to retrieve per page (default: 10).
 * @param obj.lastItemId - The ID of the last item retrieved.
 * @param obj.customerRef - The customer reference.
 * @param obj.token - The authentication token. If omitted, the SDK will use proxy auth (requires {@link initTWC}).
 * @param obj.tenant - The tenant identifier.
 * @param obj.onSuccess - The callback function to handle a successful response.
 * @param obj.onError - The callback function to handle an error response.
 */
declare function getWishlistByCustomerRef(obj: {
    pageSize?: number;
    lastItemId?: string;
    customerRef: string;
    token?: string;
    tenant: string;
    onSuccess: (response: any) => void;
    onError: (error: any) => void;
}): void;

/**
 * Retrieves a wishlist by its reference.
 *
 * @group wishlistService
 * @param obj - The configuration object.
 * @param obj.wishlistRef - The reference of the wishlist to retrieve.
 * @param obj.token - The authentication token. If omitted, the SDK will use proxy auth (requires {@link initTWC}).
 * @param obj.tenant - The tenant identifier.
 * @param obj.onSuccess - The callback function to be called when the wishlist is successfully retrieved.
 * @param obj.onError - The callback function to be called when an error occurs during the retrieval.
 */
declare function getWishlistByRef(obj: {
    wishlistRef: string;
    token?: string;
    tenant: string;
    onSuccess: (response: any) => void;
    onError: (error: any) => void;
}): void;

/**
 * Retrieves the wishlist data based on the provided parameters.
 *
 * @group wishlistService
 * @param obj - The configuration object.
 * @param obj.wishlistID - The ID of the wishlist to retrieve (either wishlistID or wishlistRef must be defined).
 * @param obj.wishlistRef - The reference of the wishlist to retrieve (either wishlistID or wishlistRef must be defined).
 * @param obj.pageSize - The number of items per page to retrieve.
 * @param obj.lastItemId - The ID of the last item retrieved.
 * @param obj.token - The authentication token. If omitted, the SDK will use proxy auth (requires {@link initTWC}).
 * @param obj.tenant - The tenant identifier.
 * @param obj.onSuccess - The callback function to handle the successful response.
 * @param obj.onError - The callback function to handle any errors.
 */
declare function getWishlist(obj: {
    wishlistID?: string;
    wishlistRef?: string;
    pageSize?: string;
    lastItemId?: string;
    token?: string;
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
 * @param obj.token - The authentication token. If omitted, the SDK will use proxy auth (requires {@link initTWC}).
 * @param obj.tenant - The tenant identifier.
 * @param obj.onSuccess - The callback function to be called when the request is successful.
 * @param obj.onError - The callback function to be called when an error occurs.
 */
declare function getWishlistItemByID(obj: {
    wishlistItemID: string;
    token?: string;
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
 * @param obj.token - The authentication token. If omitted, the SDK will use proxy auth (requires {@link initTWC}).
 * @param obj.tenant - The tenant identifier.
 * @param obj.onSuccess - The callback function to be called when the request is successful.
 * @param obj.onError - The callback function to be called when an error occurs.
 */
declare function getWishlistItemByRef(obj: {
    wishlistItemRef: string;
    token?: string;
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
 * @param obj.token - The authentication token. If omitted, the SDK will use proxy auth (requires {@link initTWC}).
 * @param obj.tenant - The tenant information.
 * @param obj.onSuccess - The callback function to handle successful response.
 * @param obj.onError - The callback function to handle error response.
 */
declare function getWishlistItems(obj: {
    wishlistID: string;
    wishlistRef: string;
    pageSize?: string;
    lastItemId?: string;
    token?: string;
    tenant: string;
    onSuccess: (response: any) => void;
    onError: (error: any) => void;
}): void;

/**
 * Updates a wishlist item by its reference.
 *
 * @group wishlistService
 * @param obj - The configuration object.
 * @param obj.wishlistItemRef - The reference of the wishlist item to update.
 * @param obj.updateWishlistItemBody - The updated wishlist item data. See https://the-wishlist-co.github.io/docs/wishlistSvcAPI.html#update-a-wishlist-item-by-wishlist-item-id for information on the fields.
 * @param obj.token - The authentication token. If omitted, the SDK will use proxy auth (requires {@link initTWC}).
 * @param obj.tenant - The tenant identifier.
 * @param obj.onSuccess - The callback function to be called on successful update.
 * @param obj.onError - The callback function to be called on error.
 */
declare function updateWishlistItemByRef(obj: {
    wishlistItemRef: string;
    updateWishlistItemBody: {
        [key: string]: any;
    };
    token?: string;
    tenant: string;
    onSuccess: (response: any) => void;
    onError: (error: any) => void;
}): void;

/**
 * Retrieves the wishlist for a customer.
 *
 * @group wishlistService
 * @param obj - The configuration object.
 * @param obj.customerID - The ID of the customer (either customerID or customerRef must be defined).
 * @param obj.customerRef - The reference of the customer (either customerID or customerRef must be defined).
 * @param obj.pageSize - The number of items to retrieve per page.
 * @param obj.lastItemId - The ID of the last item retrieved.
 * @param obj.token - The authentication token. If omitted, the SDK will use proxy auth (requires {@link initTWC}).
 * @param obj.tenant - The tenant identifier.
 * @param obj.onSuccess - The callback function to handle a successful response.
 * @param obj.onError - The callback function to handle an error response.
 */
declare function getWishlistByCustomer(obj: {
    customerID?: string;
    customerRef?: string;
    pageSize?: string;
    lastItemId?: string;
    token?: string;
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
 * @param obj.token - The authentication token. If omitted, the SDK will use proxy auth (requires {@link initTWC}).
 * @param obj.tenant - The tenant identifier.
 * @param obj.onSuccess - The callback function to be called on successful creation of the wishlist item.
 * @param obj.onError - The callback function to be called on error during the creation of the wishlist item.
 */
declare function createWishlistItem(obj: {
    createWishlistItembody: {
        [key: string]: any;
    };
    token?: string;
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
 * @param obj.token - The authentication token. If omitted, the SDK will use proxy auth (requires {@link initTWC}).
 * @param obj.tenant - The tenant identifier.
 * @param obj.onSuccess - The callback function to be called on successful creation.
 * @param obj.onError - The callback function to be called on error.
 */
declare function createWishlist(obj: {
    newWishlistBody: {
        [key: string]: any;
    };
    token?: string;
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
 * @param obj.token - The authentication token. If omitted, the SDK will use proxy auth (requires {@link initTWC}).
 * @param obj.tenant - The tenant identifier.
 * @param obj.onSuccess - The callback function to be called on successful update.
 * @param obj.onError - The callback function to be called on error.
 */
declare function updateWishlist(obj: {
    updateWishlistBody: {
        [key: string]: any;
    };
    token?: string;
    tenant: string;
    onSuccess: (response: any) => void;
    onError: (error: any) => void;
}): void;

/**
 * Updates a wishlist by its ID.
 *
 * @group wishlistService
 * @param obj - The configuration object.
 * @param obj.wishlistID - The ID of the wishlist to update.
 * @param obj.updateWishlistByIDBody - The updated wishlist data. See https://the-wishlist-co.github.io/docs/wishlistSvcAPI.html#get-wishlist-by-id-or-wishlistref for information on the fields.
 * @param obj.token - The authentication token. If omitted, the SDK will use proxy auth (requires {@link initTWC}).
 * @param obj.tenant - The tenant identifier.
 * @param obj.onSuccess - The callback function to be called on successful update.
 * @param obj.onError - The callback function to be called on error.
 */
declare function updateWishlistByID(obj: {
    wishlistID: string;
    updateWishlistByIDBody: {
        [key: string]: any;
    };
    token?: string;
    tenant: string;
    onSuccess: (response: any) => void;
    onError: (error: any) => void;
}): void;

/**
 * Updates a wishlist by its reference.
 *
 * @group wishlistService
 * @param obj - The configuration object.
 * @param obj.wishlistRef - The reference of the wishlist to update.
 * @param obj.updateWishlistByIDBody - The updated wishlist data. See https://the-wishlist-co.github.io/docs/wishlistSvcAPI.html#get-wishlist-by-id-or-wishlistref for information on the fields.
 * @param obj.token - The authentication token. If omitted, the SDK will use proxy auth (requires {@link initTWC}).
 * @param obj.tenant - The tenant identifier.
 * @param obj.onSuccess - The callback function to be called on successful update.
 * @param obj.onError - The callback function to be called on error.
 */
declare function updateWishlistByRef(obj: {
    wishlistRef: string;
    updateWishlistByIDBody: {
        [key: string]: any;
    };
    token?: string;
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
 * @param obj.token - The authentication token. If omitted, the SDK will use proxy auth (requires {@link initTWC}).
 * @param obj.tenant - The tenant identifier.
 * @param obj.onSuccess - The callback function to be called when the update is successful.
 * @param obj.onError - The callback function to be called when an error occurs during the update.
 */
declare function updateWishlistItem(obj: {
    updateWishlistItemBody: {
        [key: string]: any;
    };
    token?: string;
    tenant: string;
    onSuccess: (response: any) => void;
    onError: (error: any) => void;
}): void;

/**
 * Updates a wishlist item by its ID.
 *
 * @group wishlistService
 * @param obj - The configuration object.
 * @param obj.wishlistItemID - The ID of the wishlist item to update.
 * @param obj.updateWishlistItemBody - The updated wishlist item data. See https://the-wishlist-co.github.io/docs/wishlistSvcAPI.html#update-a-wishlist-item-by-wishlist-item-id for information on the fields.
 * @param obj.token - The authentication token. If omitted, the SDK will use proxy auth (requires {@link initTWC}).
 * @param obj.tenant - The tenant identifier.
 * @param obj.onSuccess - The callback function to be called on successful update.
 * @param obj.onError - The callback function to be called on error.
 */
declare function updateWishlistItemByID(obj: {
    wishlistItemID: string;
    updateWishlistItemBody: {
        [key: string]: any;
    };
    token?: string;
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
 * @param obj.token - The authentication token. If omitted, the SDK will use proxy auth (requires {@link initTWC}).
 * @param obj.tenant - The tenant.
 * @param obj.onSuccess - The callback function to be called on successful deletion.
 * @param obj.onError - The callback function to be called on error.
 */
declare function deleteWishlistItemByID(obj: {
    wishlistItemID: string;
    token?: string;
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
 * @param obj.token - The authentication token. If omitted, the SDK will use proxy auth (requires {@link initTWC}).
 * @param obj.tenant - The tenant identifier.
 * @param obj.onSuccess - The callback function to be called on successful deletion.
 * @param obj.onError - The callback function to be called on error.
 */
declare function deleteWishlistItemByRef(obj: {
    wishlistItemRef: string;
    token?: string;
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
 * @param obj.token - The authentication token. If omitted, the SDK will use proxy auth (requires {@link initTWC}).
 * @param obj.tenant - The tenant identifier.
 * @param obj.onSuccess - The callback function to be called when the deletion is successful.
 * @param obj.onError - The callback function to be called when an error occurs during deletion.
 */
declare function deleteWishlist(obj: {
    wishlistID?: string;
    wishlistRef?: string;
    token?: string;
    tenant: string;
    onSuccess: (response: any) => void;
    onError: (error: any) => void;
}): void;

/**
 * Deletes all wishlists for a customer.
 *
 * @group wishlistService
 * @param obj - The configuration object.
 * @param obj.customerID - The ID of the customer (either customerID or customerRef must be defined).
 * @param obj.customerRef - The reference of the customer (either customerID or customerRef must be defined).
 * @param obj.token - The authentication token. If omitted, the SDK will use proxy auth (requires {@link initTWC}).
 * @param obj.tenant - The tenant identifier.
 * @param obj.onSuccess - The callback function to be called on successful deletion.
 * @param obj.onError - The callback function to be called on error.
 */
declare function deleteAllWishlist(obj: {
    customerID?: string;
    customerRef?: string;
    token?: string;
    tenant: string;
    onSuccess: (response: any) => void;
    onError: (error: any) => void;
}): void;

/**
 * Deletes a wishlist by ID.
 *
 * @group wishlistService
 * @param obj - The configuration object.
 * @param obj.wishlistID - The ID of the wishlist to delete.
 * @param obj.token - The authentication token. If omitted, the SDK will use proxy auth (requires {@link initTWC}).
 * @param obj.tenant - The tenant identifier.
 * @param obj.onSuccess - The callback function to be called when the deletion is successful.
 * @param obj.onError - The callback function to be called when an error occurs during deletion.
 */
declare function deleteWishlistByID(obj: {
    wishlistID: string;
    token?: string;
    tenant: string;
    onSuccess: (response: any) => void;
    onError: (error: any) => void;
}): void;

/**
 * Deletes a wishlist by its reference.
 *
 * @group wishlistService
 * @param obj - The configuration object.
 * @param obj.wishlistRef - The reference of the wishlist to delete.
 * @param obj.token - The authentication token. If omitted, the SDK will use proxy auth (requires {@link initTWC}).
 * @param obj.tenant - The tenant identifier.
 * @param obj.onSuccess - The callback function to be called when the wishlist is successfully deleted.
 * @param obj.onError - The callback function to be called when an error occurs during the deletion.
 */
declare function deleteWishlistByRef(obj: {
    wishlistRef: string;
    token?: string;
    tenant: string;
    onSuccess: (response: any) => void;
    onError: (error: any) => void;
}): void;

/**
 * Retrieves the wishlist customers which are enabled for notifyMe or preRelease.
 * If the customers do not exist, this method returns an empty list.
 *
 * @group wishlistService
 * @param obj - The configuration object.
 * @param obj.productRef - The product reference to filter the customers by (either productRef or variantRef must be defined).
 * @param obj.variantRef - The variant reference to filter the customers by (either productRef or variantRef must be defined).
 * @param obj.notifyMe - A boolean indicating whether to retrieve customers with notifyMe enabled (either notifyMe or preRelease must be defined).
 * @param obj.preRelease - A boolean indicating whether to retrieve customers with preRelease enabled (either notifyMe or preRelease must be defined).
 * @param obj.token - The authentication token. If omitted, the SDK will use proxy auth (requires {@link initTWC}).
 * @param obj.tenant - The tenant identifier.
 * @param obj.onSuccess - The callback function to be called on successful retrieval of customers.
 * @param obj.onError - The callback function to be called if an error occurs during retrieval.
 */
declare function getCustomersWithFlag(obj: {
    productRef?: string;
    variantRef?: string;
    notifyMe?: boolean;
    preRelease?: boolean;
    token?: string;
    tenant: string;
    onSuccess: (response: any) => void;
    onError: (error: any) => void;
}): void;

/**
 * Resets the wishlist item flag.
 *
 * @group wishlistService
 * @param obj - The configuration object.
 * @param obj.productRef - The product reference (either productRef or variantRef must be defined).
 * @param obj.variantRef - The variant reference (either productRef or variantRef must be defined).
 * @param obj.notifyMe - Indicates whether to notify the user (either notifyMe or preRelease must be defined).
 * @param obj.preRelease - Indicates whether the item is a pre-release (either notifyMe or preRelease must be defined).
 * @param obj.token - The authentication token. If omitted, the SDK will use proxy auth (requires {@link initTWC}).
 * @param obj.tenant - The tenant identifier.
 * @param obj.onSuccess - The callback function to be called on success.
 * @param obj.onError - The callback function to be called on error.
 */
declare function resetWishlistItemFlag(obj: {
    productRef?: string;
    variantRef?: string;
    notifyMe?: boolean;
    preRelease?: boolean;
    token?: string;
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
 * @param obj.token - The authentication token. If omitted, the SDK will use proxy auth (requires {@link initTWC}).
 * @param obj.tenant - The tenant identifier.
 * @param obj.onSuccess - The callback function to be called when the update is successful.
 * @param obj.onError - The callback function to be called when an error occurs during the update.
 */
declare function getItemsPopularity(obj: {
    itemsPopularityBody: {
        [key: string]: any;
    };
    token?: string;
    tenant: string;
    onSuccess: (response: any) => void;
    onError: (error: any) => void;
}): void;

/**
 * Gets the guest (anonymous) wishlist for this browser, creating it if it does not
 * exist yet.
 *
 * The SDK resolves a durable identifier itself (`_shopify_y`, else `twc_awid`,
 * minting one if needed) and sends it as `onlineSessionID`. Integrators must never
 * construct or pass an identifier.
 *
 * `POST /wsservice/api/wishlists/anonymous` is create-or-return, so this is safe to
 * call on every logged-out page load and needs no separate GET. The returned
 * `WishlistDto.id` is persisted as the `anonymousWishlistId` that
 * {@link mergeOnLogin} needs.
 *
 * Call this on logged-out pages only — it creates an anonymous customer and
 * wishlist as a side effect.
 *
 * Silent no-op (invokes `onSuccess(null)`, never `onError`) when the tenant feature
 * flag is off, or when no durable identifier is available (e.g. cookies blocked).
 *
 * @group wishlistService
 * @param obj - The configuration object.
 * @param obj.token - The authentication token. If omitted, the SDK will use proxy auth (requires {@link initTWC}).
 * @param obj.tenant - The tenant identifier.
 * @param obj.onSuccess - Called with the `WishlistDto`, or with `null` when the call was a no-op.
 * @param obj.onError - The callback function to be called on error.
 */
declare function getOrCreateAnonymous(obj: {
    token?: string;
    tenant: string;
    onSuccess: (response: any) => void;
    onError: (error: any) => void;
}): void;

/**
 * Merges the guest (anonymous) wishlist into the logged-in customer's wishlist.
 *
 * Call this on authenticated page loads. It is idempotent, does not block render,
 * and fails silently to the shopper.
 *
 * The merge looks the customer up by email and 404s if that customer does not exist
 * in TWC yet, so a 404 is treated as a silent no-op rather than an error. The
 * backend does not mark the anonymous list as merged (WCO-4255 #6), so re-firing is
 * guarded client-side for the rest of the session.
 *
 * Silent no-op (invokes `onSuccess(null)`, never `onError`) when the tenant feature
 * flag is off, when a merge has already run this session, when no
 * `anonymousWishlistId` is known, or when `customerEmail` is blank.
 *
 * @group wishlistService
 * @param obj - The configuration object.
 * @param obj.customerEmail - The logged-in customer's real email. Required — the backend looks the customer up by it.
 * @param obj.anonymousWishlistId - The anonymous wishlist id. Defaults to the id stored by {@link getOrCreateAnonymous}.
 * @param obj.customerRef - Optional customer reference.
 * @param obj.wishlistRef - Optional target list to merge into; otherwise the customer's default list.
 * @param obj.wishlistName - Optional name, used only if a new default list is created.
 * @param obj.token - The authentication token. If omitted, the SDK will use proxy auth (requires {@link initTWC}).
 * @param obj.tenant - The tenant identifier.
 * @param obj.onSuccess - Called on a completed merge, or with `null` when the call was a no-op.
 * @param obj.onError - The callback function to be called on error.
 */
declare function mergeOnLogin(obj: {
    customerEmail: string;
    anonymousWishlistId?: string;
    customerRef?: string;
    wishlistRef?: string;
    wishlistName?: string;
    token?: string;
    tenant: string;
    onSuccess: (response: any) => void;
    onError: (error: any) => void;
}): void;

/**
 * Durable anonymous identifier resolution.
 *
 * The value resolved here is passed as the existing `onlineSessionID` parameter
 * to the anonymous wishlist endpoints. The Shopify session ID must NOT be used —
 * it rotates, so a returning shopper would get a fresh anonymous customer and an
 * empty list.
 *
 * Preference order:
 *  1. `_shopify_y` — set by the Shopify edge, ~1 year expiry, not subject to the
 *     ITP cap on JS-set cookies. Absent when the shopper declines analytics.
 *  2. `twc_awid`   — set by this SDK. Survives an analytics decline, but Safari's
 *     ITP caps JS-set cookies at ~7 days.
 *  3. Mint a new `twc_awid` (UUID v4) and store it.
 *
 * Integrators must never construct or pass an identifier — the SDK owns resolution.
 */
/**
 * Resolves the durable anonymous identifier for this browser, minting and
 * persisting one if needed.
 *
 * @group anonymousWishlist
 * @returns The identifier to send as `onlineSessionID`, or `null` when no
 *   identifier is available and none can be persisted (e.g. cookies blocked).
 *   Callers must treat `null` as a silent no-op.
 */
declare function resolveAnonymousIdentifier(): string | null;

/**
 * Client-side state for the anonymous wishlist flow.
 *
 * Two things are tracked:
 *
 *  - `anonymousWishlistId` — the `WishlistDto.id` returned by create-or-get.
 *    The merge call needs it, so it is persisted across page loads.
 *  - the merge guard — the backend does not mark an anonymous list as merged
 *    (WCO-4255 #6), so merging twice in one session is guarded here.
 *
 * Storage is best-effort: every access is wrapped, and in-memory fallbacks keep
 * the flow working when Web Storage is unavailable (private browsing, blocked
 * site data, SSR).
 */
/**
 * Returns the persisted anonymous wishlist id, or `null` if none is stored.
 *
 * @group anonymousWishlist
 */
declare function getAnonymousWishlistId(): string | null;
/**
 * Clears all anonymous wishlist state: the stored `anonymousWishlistId` and the
 * merge guard.
 *
 * Call this on logout, or when a different customer signs in during the same
 * session, so a subsequent guest list can be created and merged again.
 *
 * @group anonymousWishlist
 */
declare function resetAnonymousWishlistState(): void;

/**
 * Returns a list of customers with a matching email/mobile/phone/firstName/lastName.
 *
 * @group customerService
 * @param obj - The configuration object.
 * @param obj.email - The email of the customer.
 * @param obj.firstName - The first name of the customer.
 * @param obj.lastName - The last name of the customer.
 * @param obj.mobile - The mobile number of the customer.
 * @param obj.phone - The phone number of the customer.
 * @param obj.token - The authentication token. If omitted, the SDK will use proxy auth (requires {@link initTWC}).
 * @param obj.tenant - The tenant identifier.
 * @param obj.onSuccess - The callback function to be called on successful lookup.
 * @param obj.onError - The callback function to be called on lookup error.
 */
declare function customerLookup(obj: {
    email?: string;
    firstName?: string;
    lastName?: string;
    mobile?: string;
    phone?: string;
    token?: string;
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
 * @param obj.token - The authentication token. If omitted, the SDK will use proxy auth (requires {@link initTWC}).
 * @param obj.tenant - The tenant identifier.
 * @param obj.onSuccess - The callback function to handle the successful response.
 * @param obj.onError - The callback function to handle any errors.
 */
declare function getCustomerByID(obj: {
    customerID: string;
    token?: string;
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
 * @param obj.token - The authentication token. If omitted, the SDK will use proxy auth (requires {@link initTWC}).
 * @param obj.tenant - The tenant identifier.
 * @param obj.onSuccess - The callback function to handle the successful response.
 * @param obj.onError - The callback function to handle any errors.
 */
declare function getCustomerByRef(obj: {
    customerRef: string;
    token?: string;
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
 * @param obj.token - The authentication token. If omitted, the SDK will use proxy auth (requires {@link initTWC}).
 * @param obj.tenant - The tenant identifier.
 * @param obj.onSuccess - The callback function to be called when the request is successful.
 * @param obj.onError - The callback function to be called when an error occurs.
 */
declare function createCustomer(obj: {
    createCustomerBody: {
        [key: string]: any;
    };
    token?: string;
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
 * @param obj.token - The authentication token. If omitted, the SDK will use proxy auth (requires {@link initTWC}).
 * @param obj.tenant - The tenant ID.
 * @param obj.onSuccess - The callback function to be called on successful update.
 * @param obj.onError - The callback function to be called on error.
 */
declare function updateCustomerByID(obj: {
    customerID: string;
    updateCustomerBody: {
        [key: string]: any;
    };
    token?: string;
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
 * @param obj.token - The authentication token. If omitted, the SDK will use proxy auth (requires {@link initTWC}).
 * @param obj.tenant - The tenant identifier for the request.
 * @param obj.onSuccess - The callback function to be executed when the request is successful.
 * @param obj.onError - The callback function to be executed when an error occurs during the request.
 */
declare function updateCustomer(obj: {
    updateCustomerBody: {
        [key: string]: any;
    };
    token?: string;
    tenant: string;
    onSuccess: (response: any) => void;
    onError: (error: any) => void;
}): void;

/**
 * Updates a customer by reference.
 *
 * @group customerService
 * @param obj - The configuration object.
 * @param obj.customerRef - The reference of the customer to update.
 * @param obj.updateCustomerBody - The updated customer data. See https://the-wishlist-co.github.io/docs/customersvcApi.html#update for information on the fields.
 * @param obj.token - The authentication token. If omitted, the SDK will use proxy auth (requires {@link initTWC}).
 * @param obj.tenant - The tenant identifier.
 * @param obj.onSuccess - The callback function to be called on successful update.
 * @param obj.onError - The callback function to be called on error.
 */
declare function updateCustomerByRef(obj: {
    customerRef: string;
    updateCustomerBody: {
        [key: string]: any;
    };
    token?: string;
    tenant: string;
    onSuccess: (response: any) => void;
    onError: (error: any) => void;
}): void;

/**
 * Deletes a customer.
 *
 * @group customerService
 * @param obj - The configuration object.
 * @param obj.customerID - The ID of the customer to delete (either customerID or customerRef must be defined).
 * @param obj.customerRef - The reference of the customer to delete (either customerID or customerRef must be defined).
 * @param obj.token - The authentication token. If omitted, the SDK will use proxy auth (requires {@link initTWC}).
 * @param obj.tenant - The tenant ID.
 * @param obj.onSuccess - The callback function to be called on successful deletion.
 * @param obj.onError - The callback function to be called on error.
 */
declare function deleteCustomer(obj: {
    customerID?: string;
    customerRef?: string;
    token?: string;
    tenant: string;
    onSuccess: (response: any) => void;
    onError: (error: any) => void;
}): void;

/**
 * Deletes a customer by their ID.
 *
 * @group customerService
 * @param obj - The configuration object.
 * @param obj.customerID - The ID of the customer to delete.
 * @param obj.token - The authentication token. If omitted, the SDK will use proxy auth (requires {@link initTWC}).
 * @param obj.tenant - The tenant identifier.
 * @param obj.onSuccess - The callback function to be called when the deletion is successful.
 * @param obj.onError - The callback function to be called when an error occurs during deletion.
 */
declare function deleteCustomerByID(obj: {
    customerID: string;
    token?: string;
    tenant: string;
    onSuccess: (response: any) => void;
    onError: (error: any) => void;
}): void;

/**
 * Creates bulk customers.
 *
 * @group customerService
 * @param obj - The configuration object.
 * @param obj.createBulkCustomerBody - The body of the request containing the customer data. See https://the-wishlist-co.github.io/docs/customersvcApi.html#create-multiple-customers for information on the fields.
 * @param obj.token - The authentication token. If omitted, the SDK will use proxy auth (requires {@link initTWC}).
 * @param obj.tenant - The tenant identifier.
 * @param obj.onSuccess - The callback function to be called on successful response.
 * @param obj.onError - The callback function to be called on error.
 */
declare function createBulkCustomers(obj: {
    createBulkCustomerBody: {
        [key: string]: any;
    }[];
    token?: string;
    tenant: string;
    onSuccess: (response: any) => void;
    onError: (error: any) => void;
}): void;

export { type TWCConfig, createBulkCustomers, createCustomer, createWishlist, createWishlistItem, customerLookup, deleteAllWishlist, deleteCustomer, deleteCustomerByID, deleteWishlist, deleteWishlistByID, deleteWishlistByRef, deleteWishlistItemByID, deleteWishlistItemByRef, getAnonymousWishlistId, getCustomerByID, getCustomerByRef, getCustomersWithFlag, getItemsPopularity, getOrCreateAnonymous, getWishlist, getWishlistByCustomer, getWishlistByCustomerID, getWishlistByCustomerRef, getWishlistByID, getWishlistByRef, getWishlistItemByID, getWishlistItemByRef, getWishlistItems, initTWC, invalidateToken, mergeOnLogin, resetAnonymousWishlistState, resetWishlistItemFlag, resolveAnonymousIdentifier, resolveToken, updateCustomer, updateCustomerByID, updateCustomerByRef, updateWishlist, updateWishlistByID, updateWishlistByRef, updateWishlistItem, updateWishlistItemByID, updateWishlistItemByRef };
