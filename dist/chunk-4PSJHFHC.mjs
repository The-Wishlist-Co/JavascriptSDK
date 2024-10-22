import { axiosInstance } from './chunk-LHUGKW5W.mjs';

// src/customerService/getCustomerByID.ts
function getCustomerByID(obj) {
  axiosInstance.get(`/customerservice/api/v2/customers/${obj.customerID}`, {
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

export { getCustomerByID };
