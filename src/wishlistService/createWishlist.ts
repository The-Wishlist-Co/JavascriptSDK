import { axiosInstance } from "../axios/AxiosInstance";
import { resolveToken } from "../auth/proxyAuth";

/**
 * Creates a new wishlist.
 *
 * @group wishlistService
 * @param obj - The configuration object.
 * @param obj.newWishlistBody - The body of the new wishlist. See https://the-wishlist-co.github.io/docs/wishlistSvcAPI.html#ceate-a-wishlist for information on the fields.
 * @param obj.token - An access token from your TWC server API client. Keep it on your server; never send it to a browser.
 * @param obj.tenant - The tenant identifier.
 * @param obj.onSuccess - The callback function to be called on successful creation.
 * @param obj.onError - The callback function to be called on error.
 */
export function createWishlist(obj: {
  newWishlistBody: { [key: string]: any };
  token: string;
  tenant: string;
  onSuccess: (response: any) => void;
  onError: (error: any) => void;
}) {
  resolveToken(obj.token)
    .then((token) => {
      return axiosInstance.post(`/wsservice/api/wishlists`, obj.newWishlistBody, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "X-TWC-Tenant": obj.tenant,
        },
      });
    })
    .then((response) => {
      obj.onSuccess(response.data);
    })
    .catch((error) => {
      obj.onError(error?.response || error);
    });
}
