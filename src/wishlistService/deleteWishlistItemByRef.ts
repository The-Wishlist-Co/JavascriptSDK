import { axiosInstance } from "../axios/AxiosInstance";
import { resolveToken } from "../auth/proxyAuth";

/**
 * Deletes a wishlist item by its reference.
 *
 * @group wishlistService
 * @param obj - The configuration object.
 * @param obj.wishlistItemRef - The reference of the wishlist item to delete.
 * @param obj.token - An access token from your TWC server API client. Keep it on your server; never send it to a browser.
 * @param obj.tenant - The tenant identifier.
 * @param obj.onSuccess - The callback function to be called on successful deletion.
 * @param obj.onError - The callback function to be called on error.
 */
export function deleteWishlistItemByRef(obj: {
  wishlistItemRef: string;
  token: string;
  tenant: string;
  onSuccess: (response: any) => void;
  onError: (error: any) => void;
}) {
  resolveToken(obj.token)
    .then((token) => {
      return axiosInstance.delete(
        `/wsservice/api/wishlist/items/${obj.wishlistItemRef}/ref`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            "X-TWC-Tenant": obj.tenant,
          },
        }
      );
    })
    .then((response) => {
      obj.onSuccess(response.data);
    })
    .catch((error) => {
      obj.onError(error?.response || error);
    });
}
