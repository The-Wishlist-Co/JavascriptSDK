import { axiosInstance } from './chunk-LHUGKW5W.mjs';

// src/customerService/updateCustomerByID.ts
function updateCustomerByID(obj) {
  axiosInstance.put(`/customerservice/api/v2/customers/id=${obj.customerID}`, obj.updateCustomerBody, {
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

export { updateCustomerByID };
