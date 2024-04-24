//502 Bad gateway
import { axiosInstance } from "../axios/AxiosInstance";

export function deleteCustomerByID(obj) {
  axiosInstance
    .delete(`/customerservice/api/v2/customers/${obj.customerID}`, {
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
