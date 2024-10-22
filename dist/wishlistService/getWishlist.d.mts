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

export { getWishlist };
