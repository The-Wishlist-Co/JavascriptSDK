/**
 * Creates a wishlist item.
 *
 * @group wishlistService
 * @param obj - The configuration object.
 * @param obj.createWishlistItembody - The body of the wishlist item to be created. See https://the-wishlist-co.github.io/docs/wishlistSvcAPI.html#create-a-wishlist-item for information on the fields.
 * @param obj.token - The authentication token.
 * @param obj.tenant - The tenant identifier.
 * @param obj.onSuccess - The callback function to be called on successful creation of the wishlist item.
 * @param obj.onError - The callback function to be called on error during the creation of the wishlist item.
 */
declare function createWishlistItem(obj: {
    createWishlistItembody: {
        [key: string]: any;
    };
    token: string;
    tenant: string;
    onSuccess: (response: any) => void;
    onError: (error: any) => void;
}): void;

export { createWishlistItem };
