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

export { getWishlistByRef };
