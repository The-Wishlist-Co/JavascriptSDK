import { axiosInstance } from "../axios/AxiosInstance";
import { resolveToken } from "../auth/proxyAuth";

/**
 * Deletes all wishlists for a customer.
 *
 * @group wishlistService
 * @param obj - The configuration object.
 * @param obj.customerID - The ID of the customer (either customerID or customerRef must be defined).
 * @param obj.customerRef - The reference of the customer (either customerID or customerRef must be defined).
 * @param obj.token - The authentication token. If omitted, the SDK will use proxy auth (requires {@link initTWC}).
 * @param obj.tenant - The tenant identifier.
 * @param obj.onSuccess - The callback function to be called on successful deletion.
 * @param obj.onError - The callback function to be called on error.
 */
export function deleteAllWishlist(obj: {
  customerID?: string;
  customerRef?: string;
  token?: string;
  tenant: string;
  onSuccess: (response: any) => void;
  onError: (error: any) => void;
}) {
  const params = new URLSearchParams();
  obj.customerID && params.append("customerId", obj.customerID);
  obj.customerRef && params.append("customerRef", obj.customerRef);

  resolveToken(obj.token)
    .then((token) => {
      return axiosInstance.delete(
        `/wsservice/api/wishlists/customer?${params.toString()}`,
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
