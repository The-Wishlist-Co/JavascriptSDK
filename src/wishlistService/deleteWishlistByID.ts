import { axiosInstance } from "../axios/AxiosInstance";
import { resolveToken } from "../auth/proxyAuth";

/**
 * Deletes a wishlist by ID.
 *
 * @group wishlistService
 * @param obj - The configuration object.
 * @param obj.wishlistID - The ID of the wishlist to delete.
 * @param obj.token - The authentication token. If omitted, the SDK will use proxy auth (requires {@link initTWC}).
 * @param obj.tenant - The tenant identifier.
 * @param obj.onSuccess - The callback function to be called when the deletion is successful.
 * @param obj.onError - The callback function to be called when an error occurs during deletion.
 */
export function deleteWishlistByID(obj: {
  wishlistID: string;
  token?: string;
  tenant: string;
  onSuccess: (response: any) => void;
  onError: (error: any) => void;
}) {
  resolveToken(obj.token)
    .then((token) => {
      return axiosInstance.delete(
        `/wsservice/api/wishlists/${obj.wishlistID}`,
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
