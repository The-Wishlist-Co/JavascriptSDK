import { axiosInstance } from "../axios/AxiosInstance";
import { resolveToken } from "../auth/proxyAuth";

/**
 * Retrieves a wishlist by its ID.
 *
 * @group wishlistService
 * @param obj - The configuration object.
 * @param obj.pageSize - The number of items per page.
 * @param obj.lastItemId - The ID of the last item.
 * @param obj.wishlistID - The ID of the wishlist.
 * @param obj.token - The authentication token. If omitted, the SDK will use proxy auth (requires {@link initTWC}).
 * @param obj.tenant - The tenant.
 * @param obj.onSuccess - The callback function to handle the successful response.
 * @param obj.onError - The callback function to handle the error response.
 */
export function getWishlistByID(obj: {
  pageSize?: number;
  lastItemId?: string;
  wishlistID: string;
  token?: string;
  tenant: string;
  onSuccess: (response: any) => void;
  onError: (error: any) => void;
}) {
  const params: any = {};
  if (obj.pageSize) {
    params.pageSize = obj.pageSize;
  }
  if (obj.lastItemId) {
    params.lastItemId = obj.lastItemId;
  }

  resolveToken(obj.token)
    .then((token) => {
      return axiosInstance.get(`/wsservice/api/wishlists/${obj.wishlistID}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "X-TWC-Tenant": obj.tenant,
        },
        params: params,
      });
    })
    .then((response) => {
      if (obj.onSuccess) {
        obj.onSuccess(response.data);
      }
    })
    .catch((error) => {
      if (obj.onError) {
        obj.onError(error?.response || error);
      }
    });
}
