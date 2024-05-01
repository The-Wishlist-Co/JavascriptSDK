// This API endpoint supercedes the individual APIS update wishlist by ID and update Wishlsit by Ref and provides a single endpoint to do either

import { axiosInstance } from "../axios/AxiosInstance";

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
export function updateWishlist(obj: {
  updateWishlistBody: { [key: string]: any };
  token: string;
  tenant: string;
  onSuccess: (response: any) => void;
  onError: (error: any) => void;
}) {
  axiosInstance
    .put(`/wsservice/api/wishlists`, obj.updateWishlistBody, {
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
