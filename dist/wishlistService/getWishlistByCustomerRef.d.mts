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

export { getWishlistByCustomerRef };
