// /api/wishlist/items
// This api allows update of wishlist item by ID or Ref, and supercedes the individual endpoints for updateWishlistItemByID and updateWishlistItemByRef

import { axiosInstance } from "../axios/AxiosInstance";

/**
 * Updates a wishlist item.
 *
 * @group wishlistService
 * @param obj - The configuration object.
 * @param obj.updateWishlistItemBody - The body of the request containing the updated wishlist item data. See https://the-wishlist-co.github.io/docs/wishlistSvcAPI.html#update-a-wishlist-item-by-wishlist-item-id for information on the fields.
 * @param obj.token - The authentication token.
 * @param obj.tenant - The tenant identifier.
 * @param obj.onSuccess - The callback function to be called when the update is successful.
 * @param obj.onError - The callback function to be called when an error occurs during the update.
 */
export function updateWishlistItem(obj: {
  updateWishlistItemBody: { [key: string]: any };
  token: string;
  tenant: string;
  onSuccess: (response: any) => void;
  onError: (error: any) => void;
}) {
  axiosInstance
    .put(`/wsservice/api/wishlist/items`, obj.updateWishlistItemBody, {
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
