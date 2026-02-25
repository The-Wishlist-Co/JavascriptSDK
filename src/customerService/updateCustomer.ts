//   /wsservice/api/wishlist/items
//  Update customer by either ID or Ref.  Supercedes the individual update customer by ID and update customer by Ref apis
import { axiosInstance } from "../axios/AxiosInstance";
import { resolveToken } from "../auth/proxyAuth";

/**
 * Updates a customer using the provided data.
 *
 * @group customerService
 * @param obj - The configuration object.
 * @param obj.updateCustomerBody - The data to be sent in the request body for updating the customer. See https://the-wishlist-co.github.io/docs/customersvcApi.html#update for information on the fields.
 * @param obj.token - The authentication token. If omitted, the SDK will use proxy auth (requires {@link initTWC}).
 * @param obj.tenant - The tenant identifier for the request.
 * @param obj.onSuccess - The callback function to be executed when the request is successful.
 * @param obj.onError - The callback function to be executed when an error occurs during the request.
 */
export function updateCustomer(obj: {
  updateCustomerBody: { [key: string]: any };
  token?: string;
  tenant: string;
  onSuccess: (response: any) => void;
  onError: (error: any) => void;
}) {
  resolveToken(obj.token)
    .then((token) => {
      return axiosInstance.put(
        `/customerservice/api/v2/customers`,
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
