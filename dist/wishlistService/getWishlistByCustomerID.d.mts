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

export { getWishlistByCustomerID };
