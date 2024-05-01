// /api/v2
import { axiosInstance } from "../axios/AxiosInstance";

/**
 * Creates bulk customers.
 *
 * @group customerService
 * @param obj - The configuration object.
 * @param obj.createBulkCustomerBody - The body of the request containing the customer data. See https://the-wishlist-co.github.io/docs/customersvcApi.html#create-multiple-customers for information on the fields.
 * @param obj.token - The authentication token.
 * @param obj.tenant - The tenant identifier.
 * @param obj.onSuccess - The callback function to be called on successful response.
 * @param obj.onError - The callback function to be called on error.
 */
export function createBulkCustomers(obj: {
  createBulkCustomerBody: { [key: string]: any }[];
  token: string;
  tenant: string;
  onSuccess: (response: any) => void;
  onError: (error: any) => void;
}) {
  axiosInstance
    .post(`/customerservice/api/v2/upload-customers/`, obj.createBulkCustomerBody, {
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
