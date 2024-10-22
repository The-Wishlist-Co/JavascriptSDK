/**
 * Show a count of the number of times an item has been wishlisted.
 *
 * @group wishlistService
 * @param obj - The configuration object.
 * @param obj.itemsPopularityBody - The array of product or variant refs to get statistic. See https://the-wishlist-co.github.io/docs/wishlistSvcAPI.html#update-a-wishlist-item-by-wishlist-item-id for information on the fields.
 * @param obj.token - The authentication token.
 * @param obj.tenant - The tenant identifier.
 * @param obj.onSuccess - The callback function to be called when the update is successful.
 * @param obj.onError - The callback function to be called when an error occurs during the update.
 */
declare function getItemsPopularity(obj: {
    itemsPopularityBody: {
        [key: string]: any;
    };
    token: string;
    tenant: string;
    onSuccess: (response: any) => void;
    onError: (error: any) => void;
}): void;

export { getItemsPopularity };
