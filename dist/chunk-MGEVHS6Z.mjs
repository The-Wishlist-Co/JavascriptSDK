import { axiosInstance } from './chunk-LHUGKW5W.mjs';

// src/customerService/createBulkCustomers.ts
function createBulkCustomers(obj) {
  axiosInstance.post(`/customerservice/api/v2/upload-customers/`, obj.createBulkCustomerBody, {
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

export { createBulkCustomers };
