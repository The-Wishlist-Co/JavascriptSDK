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

export { deleteWishlistByRef };
