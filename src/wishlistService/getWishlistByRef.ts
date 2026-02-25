import { axiosInstance } from "../axios/AxiosInstance";
import { resolveToken } from "../auth/proxyAuth";

/**
 * Retrieves a wishlist by its reference.
 *
 * @group wishlistService
 * @param obj - The configuration object.
 * @param obj.wishlistRef - The reference of the wishlist to retrieve.
 * @param obj.token - The authentication token. If omitted, the SDK will use proxy auth (requires {@link initTWC}).
 * @param obj.tenant - The tenant identifier.
 * @param obj.onSuccess - The callback function to be called when the wishlist is successfully retrieved.
 * @param obj.onError - The callback function to be called when an error occurs during the retrieval.
 */
export function getWishlistByRef(obj: {
  wishlistRef: string;
  token?: string;
  tenant: string;
  onSuccess: (response: any) => void;
  onError: (error: any) => void;
}) {
  resolveToken(obj.token)
    .then((token) => {
      return axiosInstance.get(
        `/wsservice/api/wishlists/${obj.wishlistRef}/byref`,
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
