import { axiosInstance } from "../axios/AxiosInstance";
import { resolveToken } from "../auth/proxyAuth";

/**
 * Retrieves the wishlist for a customer based on the customer reference.
 *
 * @group wishlistService
 * @param obj - The configuration object.
 * @param obj.pageSize - The number of items to retrieve per page (default: 10).
 * @param obj.lastItemId - The ID of the last item retrieved.
 * @param obj.customerRef - The customer reference.
 * @param obj.token - The authentication token. If omitted, the SDK will use proxy auth (requires {@link initTWC}).
 * @param obj.tenant - The tenant identifier.
 * @param obj.onSuccess - The callback function to handle a successful response.
 * @param obj.onError - The callback function to handle an error response.
 */
export function getWishlistByCustomerRef(obj: {
  pageSize?: number;
  lastItemId?: string;
  customerRef: string;
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
        `/wsservice/api/wishlists/customer/${obj.customerRef}/byref`,
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
      obj.onSuccess(response.data);
    })
    .catch((error) => {
      obj.onError(error?.response || error);
    });
}
