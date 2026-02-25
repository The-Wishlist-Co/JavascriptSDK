import { axiosInstance } from "../axios/AxiosInstance";
import { resolveToken } from "../auth/proxyAuth";

/**
 * Retrieves the wishlist for a specific customer ID.
 *
 * @group wishlistService
 * @param obj - The configuration object.
 * @param obj.pageSize - The number of items to retrieve per page (default: 10).
 * @param obj.lastItemId - The ID of the last item retrieved.
 * @param obj.customerID - The ID of the customer.
 * @param obj.token - The authentication token. If omitted, the SDK will use proxy auth (requires {@link initTWC}).
 * @param obj.tenant - The tenant ID.
 * @param obj.onSuccess - The callback function to handle the successful response.
 * @param obj.onError - The callback function to handle any errors.
 */
export function getWishlistByCustomerID(obj: {
  pageSize?: number;
  lastItemId?: string;
  customerID: any;
  token?: string;
  tenant: string;
  onSuccess: (response: any) => void;
  onError: (error: any) => void;
}) {
  const params = {
    pageSize: obj.pageSize || 10,
    lastItemId: obj.lastItemId || "",
  };

  resolveToken(obj.token)
    .then((token) => {
      return axiosInstance.get(
        `/wsservice/api/wishlists/customer/${obj.customerID}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            "X-TWC-Tenant": obj.tenant,
          },
          params: params,
        }
      );
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
