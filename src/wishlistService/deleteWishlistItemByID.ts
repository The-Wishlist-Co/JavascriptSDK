// /api/wishlist/items/{id}
import { axiosInstance } from "../axios/AxiosInstance";
import { resolveToken } from "../auth/proxyAuth";

/**
 * Deletes a wishlist item by ID.
 *
 * @group wishlistService
 * @param obj - The configuration object.
 * @param obj.wishlistItemID - The ID of the wishlist item to delete.
 * @param obj.token - The authentication token. If omitted, the SDK will use proxy auth (requires {@link initTWC}).
 * @param obj.tenant - The tenant.
 * @param obj.onSuccess - The callback function to be called on successful deletion.
 * @param obj.onError - The callback function to be called on error.
 */
export function deleteWishlistItemByID(obj: {
  wishlistItemID: string;
  token?: string;
  tenant: string;
  onSuccess: (response: any) => void;
  onError: (error: any) => void;
}) {
  resolveToken(obj.token)
    .then((token) => {
      return axiosInstance.delete(
        `/wsservice/api/wishlist/items/${obj.wishlistItemID}`,
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
