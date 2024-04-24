import { axiosInstance } from "../axios/AxiosInstance";

export function getCustomerByRef(obj) {
  axiosInstance
    .get(`/customerservice/api/v2/customers/${obj.customerRef}/ref`, {
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
