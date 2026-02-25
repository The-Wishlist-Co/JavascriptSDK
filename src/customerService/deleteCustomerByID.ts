//502 Bad gateway
import { axiosInstance } from "../axios/AxiosInstance";
import { resolveToken } from "../auth/proxyAuth";

/**
 * Deletes a customer by their ID.
 *
 * @group customerService
 * @param obj - The configuration object.
 * @param obj.customerID - The ID of the customer to delete.
 * @param obj.token - The authentication token. If omitted, the SDK will use proxy auth (requires {@link initTWC}).
 * @param obj.tenant - The tenant identifier.
 * @param obj.onSuccess - The callback function to be called when the deletion is successful.
 * @param obj.onError - The callback function to be called when an error occurs during deletion.
 */
export function deleteCustomerByID(obj: {
  customerID: string;
  token?: string;
  tenant: string;
  onSuccess: (response: any) => void;
  onError: (error: any) => void;
}) {
  resolveToken(obj.token)
    .then((token) => {
      return axiosInstance.delete(
        `/customerservice/api/v2/customers/${obj.customerID}`,
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
