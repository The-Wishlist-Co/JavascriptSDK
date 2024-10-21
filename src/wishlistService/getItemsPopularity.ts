// /api/wishlists/itemPopularity
// This api show a count of the number of times an item has been wishlisted.

import { axiosInstance } from "../axios/AxiosInstance";

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
export function getItemsPopularity(obj: {
   itemsPopularityBody: { [key: string]: any };
   token: string;
   tenant: string;
   onSuccess: (response: any) => void;
   onError: (error: any) => void;
}) {
   axiosInstance
      .post(`/wsservice/api/wishlist/itemPopularity`, obj.itemsPopularityBody, {
         headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${obj.token}`,
            "X-TWC-Tenant": obj.tenant,
         },
      })
      .then((response) => {
         obj.onSuccess(response.data);
      })
      .catch((error) => {
         obj.onError(error?.response || error);
      });
}
