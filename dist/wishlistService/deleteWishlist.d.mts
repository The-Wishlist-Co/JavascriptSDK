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

export { deleteWishlist };
