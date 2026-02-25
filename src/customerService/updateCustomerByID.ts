//   /wsservice/api/wishlist/items
import { axiosInstance } from "../axios/AxiosInstance";
import { resolveToken } from "../auth/proxyAuth";

/**
 * Updates a customer by their ID.
 *
 * @group customerService
 * @param obj - The configuration object.
 * @param obj.customerID - The ID of the customer to update.
 * @param obj.updateCustomerBody - The updated customer data. See https://the-wishlist-co.github.io/docs/customersvcApi.html#update for information on the fields.
 * @param obj.token - The authentication token. If omitted, the SDK will use proxy auth (requires {@link initTWC}).
 * @param obj.tenant - The tenant ID.
 * @param obj.onSuccess - The callback function to be called on successful update.
 * @param obj.onError - The callback function to be called on error.
 */
export function updateCustomerByID(obj: {
  customerID: string;
  updateCustomerBody: { [key: string]: any };
  token?: string;
  tenant: string;
  onSuccess: (response: any) => void;
  onError: (error: any) => void;
}) {
  resolveToken(obj.token)
    .then((token) => {
      return axiosInstance.put(
        `/customerservice/api/v2/customers/id=${obj.customerID}`,
        obj.updateCustomerBody,
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
