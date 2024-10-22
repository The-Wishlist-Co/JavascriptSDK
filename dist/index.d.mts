/**
 * Retrieves a wishlist by its ID.
 *
 * @group wishlistService
 * @param obj - The configuration object.
 * @param obj.pageSize - The number of items per page.
 * @param obj.lastItemId - The ID of the last item.
 * @param obj.wishlistID - The ID of the wishlist.
 * @param obj.token - The authentication token.
 * @param obj.tenant - The tenant.
 * @param obj.onSuccess - The callback function to handle the successful response.
 * @param obj.onError - The callback function to handle the error response.
 */
declare function getWishlistByID(obj: {
    pageSize?: number;
    lastItemId?: string;
    wishlistID: string;
    token: string;
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
 * @param obj.token - The authentication token.
 * @param obj.tenant - The tenant ID.
 * @param obj.onSuccess - The callback function to handle the successful response.
 * @param obj.onError - The callback function to handle any errors.
 */
declare function getWishlistByCustomerID(obj: {
    pageSize?: number;
    lastItemId?: string;
    customerID: any;
    token: string;
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
 * @param obj.token - The authentication token.
 * @param obj.tenant - The tenant identifier.
 * @param obj.onSuccess - The callback function to handle a successful response.
 * @param obj.onError - The callback function to handle an error response.
 */
declare function getWishlistByCustomerRef(obj: {
    pageSize?: number;
    lastItemId?: string;
    customerRef: string;
    token: string;
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
 * @param obj.token - The authentication token.
 * @param obj.tenant - The tenant identifier.
 * @param obj.onSuccess - The callback function to be called when the wishlist is successfully retrieved.
 * @param obj.onError - The callback function to be called when an error occurs during the retrieval.
 */
declare function getWishlistByRef(obj: {
    wishlistRef: string;
    token: string;
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
 * @param obj.token - The authentication token.
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
 * @param obj.token - The authentication token.
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
 * @param obj.token - The authentication token.
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
 * @param obj.token - The authentication token.
 * @param obj.tenant - The tenant information.
 * @param obj.onSuccess - The callback function to handle successful response.
 * @param obj.onError - The callback function to handle error response.
 */
declare function getWishlistItems(obj: {
    wishlistID: string;
    wishlistRef: string;
    pageSize?: string;
    lastItemId?: string;
    token: string;
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
 * @param obj.token - The authentication token.
 * @param obj.tenant - The tenant identifier.
 * @param obj.onSuccess - The callback function to be called on successful update.
 * @param obj.onError - The callback function to be called on error.
 */
declare function updateWishlistItemByRef(obj: {
    wishlistItemRef: string;
    updateWishlistItemBody: {
        [key: string]: any;
    };
    token: string;
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
 * @param obj.token - The authentication token.
 * @param obj.tenant - The tenant identifier.
 * @param obj.onSuccess - The callback function to handle a successful response.
 * @param obj.onError - The callback function to handle an error response.
 */
declare function getWishlistByCustomer(obj: {
    customerID?: string;
    customerRef?: string;
    pageSize?: string;
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
 * @param obj.token - The authentication token.
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
 * @param obj.token - The authentication token.
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
 * @param obj.token - The authentication token.
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
 * Updates a wishlist by its ID.
 *
 * @group wishlistService
 * @param obj - The configuration object.
 * @param obj.wishlistID - The ID of the wishlist to update.
 * @param obj.updateWishlistByIDBody - The updated wishlist data. See https://the-wishlist-co.github.io/docs/wishlistSvcAPI.html#get-wishlist-by-id-or-wishlistref for information on the fields.
 * @param obj.token - The authentication token.
 * @param obj.tenant - The tenant identifier.
 * @param obj.onSuccess - The callback function to be called on successful update.
 * @param obj.onError - The callback function to be called on error.
 */
declare function updateWishlistByID(obj: {
    wishlistID: string;
    updateWishlistByIDBody: {
        [key: string]: any;
    };
    token: string;
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
 * @param obj.token - The authentication token.
 * @param obj.tenant - The tenant identifier.
 * @param obj.onSuccess - The callback function to be called on successful update.
 * @param obj.onError - The callback function to be called on error.
 */
declare function updateWishlistByRef(obj: {
    wishlistRef: string;
    updateWishlistByIDBody: {
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
 * @param obj.token - The authentication token.
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
 * Updates a wishlist item by its ID.
 *
 * @group wishlistService
 * @param obj - The configuration object.
 * @param obj.wishlistItemID - The ID of the wishlist item to update.
 * @param obj.updateWishlistItemBody - The updated wishlist item data. See https://the-wishlist-co.github.io/docs/wishlistSvcAPI.html#update-a-wishlist-item-by-wishlist-item-id for information on the fields.
 * @param obj.token - The authentication token.
 * @param obj.tenant - The tenant identifier.
 * @param obj.onSuccess - The callback function to be called on successful update.
 * @param obj.onError - The callback function to be called on error.
 */
declare function updateWishlistItemByID(obj: {
    wishlistItemID: string;
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
 * @param obj.token - The authorization token.
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
 * @param obj.token - The authentication token.
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
 * @param obj.token - The authentication token.
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
 * Deletes all wishlists for a customer.
 *
 * @group wishlistService
 * @param obj - The configuration object.
 * @param obj.customerID - The ID of the customer (either customerID or customerRef must be defined).
 * @param obj.customerRef - The reference of the customer (either customerID or customerRef must be defined).
 * @param obj.token - The authentication token.
 * @param obj.tenant - The tenant identifier.
 * @param obj.onSuccess - The callback function to be called on successful deletion.
 * @param obj.onError - The callback function to be called on error.
 */
declare function deleteAllWishlist(obj: {
    customerID?: string;
    customerRef?: string;
    token: string;
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
 * @param obj.token - The authentication token.
 * @param obj.tenant - The tenant identifier.
 * @param obj.onSuccess - The callback function to be called when the deletion is successful.
 * @param obj.onError - The callback function to be called when an error occurs during deletion.
 */
declare function deleteWishlistByID(obj: {
    wishlistID: string;
    token: string;
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
 * @param obj.token - The authentication token.
 * @param obj.tenant - The tenant identifier.
 * @param obj.onSuccess - The callback function to be called when the wishlist is successfully deleted.
 * @param obj.onError - The callback function to be called when an error occurs during the deletion.
 */
declare function deleteWishlistByRef(obj: {
    wishlistRef: string;
    token: string;
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
 * @param obj.token - The authentication token.
 * @param obj.tenant - The tenant identifier.
 * @param obj.onSuccess - The callback function to be called on successful retrieval of customers.
 * @param obj.onError - The callback function to be called if an error occurs during retrieval.
 */
declare function getCustomersWithFlag(obj: {
    productRef?: string;
    variantRef?: string;
    notifyMe?: boolean;
    preRelease?: boolean;
    token: string;
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
 * @param obj.token - The authentication token.
 * @param obj.tenant - The tenant identifier.
 * @param obj.onSuccess - The callback function to be called on success.
 * @param obj.onError - The callback function to be called on error.
 */
declare function resetWishlistItemFlag(obj: {
    productRef?: string;
    variantRef?: string;
    notifyMe?: boolean;
    preRelease?: boolean;
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
 * @param obj.token - The authentication token.
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
 * Returns a list of customers with a matching email/mobile/phone/firstName/lastName.
 *
 * @group customerService
 * @param obj - The configuration object.
 * @param obj.email - The email of the customer.
 * @param obj.firstName - The first name of the customer.
 * @param obj.lastName - The last name of the customer.
 * @param obj.mobile - The mobile number of the customer.
 * @param obj.phone - The phone number of the customer.
 * @param obj.token - The authentication token.
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
 * @param obj.token - The authentication token.
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
 * @param obj.token - The authentication token.
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
 * @param obj.token - The authentication token.
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
 * @param obj.token - The authentication token.
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
 * @param obj.token - The authentication token for the request.
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

/**
 * Updates a customer by reference.
 *
 * @group customerService
 * @param obj - The configuration object.
 * @param obj.customerRef - The reference of the customer to update.
 * @param obj.updateCustomerBody - The updated customer data. See https://the-wishlist-co.github.io/docs/customersvcApi.html#update for information on the fields.
 * @param obj.token - The authentication token.
 * @param obj.tenant - The tenant identifier.
 * @param obj.onSuccess - The callback function to be called on successful update.
 * @param obj.onError - The callback function to be called on error.
 */
declare function updateCustomerByRef(obj: {
    customerRef: string;
    updateCustomerBody: {
        [key: string]: any;
    };
    token: string;
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
 * @param obj.token - The authentication token.
 * @param obj.tenant - The tenant ID.
 * @param obj.onSuccess - The callback function to be called on successful deletion.
 * @param obj.onError - The callback function to be called on error.
 */
declare function deleteCustomer(obj: {
    customerID?: string;
    customerRef?: string;
    token: string;
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
 * @param obj.token - The authentication token.
 * @param obj.tenant - The tenant identifier.
 * @param obj.onSuccess - The callback function to be called when the deletion is successful.
 * @param obj.onError - The callback function to be called when an error occurs during deletion.
 */
declare function deleteCustomerByID(obj: {
    customerID: string;
    token: string;
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
 * @param obj.token - The authentication token.
 * @param obj.tenant - The tenant identifier.
 * @param obj.onSuccess - The callback function to be called on successful response.
 * @param obj.onError - The callback function to be called on error.
 */
declare function createBulkCustomers(obj: {
    createBulkCustomerBody: {
        [key: string]: any;
    }[];
    token: string;
    tenant: string;
    onSuccess: (response: any) => void;
    onError: (error: any) => void;
}): void;

export { createBulkCustomers, createCustomer, createWishlist, createWishlistItem, customerLookup, deleteAllWishlist, deleteCustomer, deleteCustomerByID, deleteWishlist, deleteWishlistByID, deleteWishlistByRef, deleteWishlistItemByID, deleteWishlistItemByRef, getCustomerByID, getCustomerByRef, getCustomersWithFlag, getItemsPopularity, getWishlist, getWishlistByCustomer, getWishlistByCustomerID, getWishlistByCustomerRef, getWishlistByID, getWishlistByRef, getWishlistItemByID, getWishlistItemByRef, getWishlistItems, resetWishlistItemFlag, updateCustomer, updateCustomerByID, updateCustomerByRef, updateWishlist, updateWishlistByID, updateWishlistByRef, updateWishlistItem, updateWishlistItemByID, updateWishlistItemByRef };
