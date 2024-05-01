// This API supercedes the individual API delete customer by ID, and allows deletion by either ID or Ref
import { axiosInstance } from "../axios/AxiosInstance";

/**
 * Deletes a customer.
 *
 * @group customerService
 * @param obj - The configuration object.
 * @param obj.customerID - The ID of the customer to delete (either customerID or customerRef must be defined).
 * @param obj.customerRef - The reference of the customer to delete (either customerID or customerRef must be defined).
 * @param obj.token - The authentication token.
 * @param obj.tenant - The tenant ID.
 * @param obj.onSuccess - The callback function to be called on successful deletion.
 * @param obj.onError - The callback function to be called on error.
 */
export function deleteCustomer(obj: {
  customerID?: string;
  customerRef?: string;
  token: string;
  tenant: string;
  onSuccess: (response: any) => void;
  onError: (error: any) => void;
}) {
  const params = new URLSearchParams();

  obj.customerID && params.append("id", obj.customerID);
  obj.customerRef && params.append("customerRef", obj.customerRef);

  axiosInstance
    .delete(`/customerservice/api/v2/customers?${params.toString()}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${obj.token}`,
        "X-TWC-Tenant": obj.tenant,
      },
    })
    .then((response) => {
      obj.onSuccess(response.data);
    })
    .catch((error) => {
      obj.onError(error?.response || error);
    });
}
