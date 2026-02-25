// /api/wishlist/items/{id}
// /wsservice/api/wishlist/items/ref/Item 6
import { axiosInstance } from "../axios/AxiosInstance";
import { resolveToken } from "../auth/proxyAuth";

/**
 * Retrieves a wishlist item by its ID.
 *
 * @group wishlistService
 * @param obj - The configuration object.
 * @param obj.wishlistItemID - The ID of the wishlist item to retrieve.
 * @param obj.token - The authentication token. If omitted, the SDK will use proxy auth (requires {@link initTWC}).
 * @param obj.tenant - The tenant identifier.
 * @param obj.onSuccess - The callback function to be called when the request is successful.
 * @param obj.onError - The callback function to be called when an error occurs.
 */
export function getWishlistItemByID(obj: {
  wishlistItemID: string;
  token?: string;
  tenant: string;
  onSuccess: (response: any) => void;
  onError: (error: any) => void;
}) {
  resolveToken(obj.token)
    .then((token) => {
      return axiosInstance.get(
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
