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

export { updateWishlistByID };
