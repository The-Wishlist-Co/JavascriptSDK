/**
 * Updates a wishlist item by its reference.
 *
 * @group wishlistService
 * @param obj - The configuration object.
 * @param obj.wishlistItemRef - The reference of the wishlist item to update.
 * @param obj.updateWishlistItemBody - The updated wishlist item data. See https://the-wishlist-co.github.io/docs/wishlistSvcAPI.html#update-a-wishlist-item-by-wishlist-item-id for information on the fields.
 * @param obj.token - The authentication token.
 * @param obj.tenant - The tenant identifier.
 * @param obj.onSuccess - The callback function to be called on successful update.
 * @param obj.onError - The callback function to be called on error.
 */
declare function updateWishlistItemByRef(obj: {
    wishlistItemRef: string;
    updateWishlistItemBody: {
        [key: string]: any;
    };
    token: string;
    tenant: string;
    onSuccess: (response: any) => void;
    onError: (error: any) => void;
}): void;

export { updateWishlistItemByRef };
