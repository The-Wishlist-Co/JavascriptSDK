import { axiosInstance } from './chunk-LHUGKW5W.mjs';

// src/customerService/getCusotmerByRef.ts
function getCustomerByRef(obj) {
  axiosInstance.get(`/customerservice/api/v2/customers/${obj.customerRef}/ref`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${obj.token}`,
      "X-TWC-Tenant": obj.tenant
    }
  }).then((response) => {
    obj.onSuccess(response.data);
  }).catch((error) => {
    obj.onError((error == null ? void 0 : error.response) || error);
  });
}

export { getCustomerByRef };
