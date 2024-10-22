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

export { getWishlistByCustomer };
