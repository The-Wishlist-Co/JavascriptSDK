import { axiosInstance } from "../axios/AxiosInstance";
import { resolveToken } from "../auth/proxyAuth";

/**
 * Retrieves customer information by ID.
 *
 * @group customerService
 * @param obj - The configuration object.
 * @param obj.customerID - The ID of the customer to retrieve.
 * @param obj.token - The authentication token. If omitted, the SDK will use proxy auth (requires {@link initTWC}).
 * @param obj.tenant - The tenant identifier.
 * @param obj.onSuccess - The callback function to handle the successful response.
 * @param obj.onError - The callback function to handle any errors.
 */
export function getCustomerByID(obj: {
  customerID: string;
  token?: string;
  tenant: string;
  onSuccess: (response: any) => void;
  onError: (error: any) => void;
}) {
  resolveToken(obj.token)
    .then((token) => {
      return axiosInstance.get(
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
