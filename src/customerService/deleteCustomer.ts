// This API supercedes the individual API delete customer by ID, and allows deletion by either ID or Ref
import { axiosInstance } from "../axios/AxiosInstance";

export function deleteCustomer(obj) {
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
