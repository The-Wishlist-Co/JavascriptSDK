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

export { getWishlistByID };
