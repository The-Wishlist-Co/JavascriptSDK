import { axiosInstance } from './chunk-LHUGKW5W.mjs';

// src/wishlistService/getCustomersWithFlag.ts
function getCustomersWithFlag(obj) {
  const params = {};
  if (obj.productRef) {
    params.productRef = obj.productRef;
  } else if (obj.variantRef) {
    params.variantRef = obj.variantRef;
  }
  if (obj.notifyMe !== void 0) {
    params.notifyMe = obj.notifyMe.toString();
  } else if (obj.preRelease !== void 0) {
    params.preRelease = obj.preRelease.toString();
  }
  axiosInstance.get("/wsservice/api/wishlist/items/getCustomersWithFlag", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${obj.token}`,
      "X-TWC-Tenant": obj.tenant
    },
    params
    // Pass query parameters
  }).then((response) => {
    if (obj.onSuccess) {
      obj.onSuccess(response.data);
    }
  }).catch((error) => {
    if (obj.onError) {
      obj.onError((error == null ? void 0 : error.response) || error);
    }
  });
}

export { getCustomersWithFlag };
