import { axiosInstance } from "../axios/AxiosInstance";

export function createCustomer(obj) {
  axiosInstance
    .post(`/customerservice/api/v2/customers/`, obj.createCustomerBody, {
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
