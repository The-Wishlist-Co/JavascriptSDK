//  /api/v2/customers/customerRef={customerRef}
import { axiosInstance } from "../axios/AxiosInstance";

/**
 * Updates a customer by reference.
 *
 * @group customerService
 * @param obj - The configuration object.
 * @param obj.customerRef - The reference of the customer to update.
 * @param obj.updateCustomerBody - The updated customer data. See https://the-wishlist-co.github.io/docs/customersvcApi.html#update for information on the fields.
 * @param obj.token - The authentication token.
 * @param obj.tenant - The tenant identifier.
 * @param obj.onSuccess - The callback function to be called on successful update.
 * @param obj.onError - The callback function to be called on error.
 */
export function updateCustomerByRef(obj: {
  customerRef: string;
  updateCustomerBody: { [key: string]: any };
  token: string;
  tenant: string;
  onSuccess: (response: any) => void;
  onError: (error: any) => void;
}) {
  axiosInstance
    .put(
      `/customerservice/api/v2/customers/customerRef=${obj.customerRef}`,
      obj.updateCustomerBody,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${obj.token}`,
          "X-TWC-Tenant": obj.tenant,
        },
      }
    )
    .then((response) => {
      obj.onSuccess(response.data);
    })
    .catch((error) => {
      obj.onError(error?.response || error);
    });
}
