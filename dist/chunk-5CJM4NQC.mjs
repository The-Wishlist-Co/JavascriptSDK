import { axiosInstance } from './chunk-LHUGKW5W.mjs';

// src/customerService/updateCustomer.ts
function updateCustomer(obj) {
  axiosInstance.put(`/customerservice/api/v2/customers`, obj.updateCustomerBody, {
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

export { updateCustomer };
