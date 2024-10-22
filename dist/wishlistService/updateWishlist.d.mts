/**
 * Updates a wishlist.
 *
 * @group wishlistService
 * @param obj - The configuration object.
 * @param obj.updateWishlistBody - The body of the wishlist update request. See https://the-wishlist-co.github.io/docs/wishlistSvcAPI.html#update-wishlist-by-either-id-or-ref for information on the fields.
 * @param obj.token - The authentication token.
 * @param obj.tenant - The tenant identifier.
 * @param obj.onSuccess - The callback function to be called on successful update.
 * @param obj.onError - The callback function to be called on error.
 */
declare function updateWishlist(obj: {
    updateWishlistBody: {
        [key: string]: any;
    };
    token: string;
    tenant: string;
    onSuccess: (response: any) => void;
    onError: (error: any) => void;
}): void;

export { updateWishlist };
