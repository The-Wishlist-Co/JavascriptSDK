/**
 * Retrieves a wishlist item by its ID.
 *
 * @group wishlistService
 * @param obj - The configuration object.
 * @param obj.wishlistItemID - The ID of the wishlist item to retrieve.
 * @param obj.token - The authentication token.
 * @param obj.tenant - The tenant identifier.
 * @param obj.onSuccess - The callback function to be called when the request is successful.
 * @param obj.onError - The callback function to be called when an error occurs.
 */
declare function getWishlistItemByID(obj: {
    wishlistItemID: string;
    token: string;
    tenant: string;
    onSuccess: (response: any) => void;
    onError: (error: any) => void;
}): void;

export { getWishlistItemByID };
