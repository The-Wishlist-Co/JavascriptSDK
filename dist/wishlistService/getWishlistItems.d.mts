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

export { getWishlistItems };
