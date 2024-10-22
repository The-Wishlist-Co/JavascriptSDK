import { axiosInstance } from './chunk-LHUGKW5W.mjs';

// src/wishlistService/resetWishlistItemFlag.ts
function resetWishlistItemFlag(obj) {
  const params = {};
  if (obj.productRef) {
    params.productRef = obj.productRef;
  } else if (obj.variantRef) {
    params.variantRef = obj.variantRef;
  }
  if (obj.notifyMe) {
    params.notifyMe = obj.notifyMe.toString();
  } else if (obj.preRelease) {
    params.preRelease = obj.preRelease.toString();
  }
  axiosInstance.put(
    "/wsservice/api/wishlist/items/resetFlag",
    {},
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${obj.token}`,
        "X-TWC-Tenant": obj.tenant
      },
      params
    }
  ).then((response) => {
    if (obj.onSuccess) {
      obj.onSuccess(response.data);
    }
  }).catch((error) => {
    if (obj.onError) {
      obj.onError((error == null ? void 0 : error.response) || error);
    }
  });
}

export { resetWishlistItemFlag };
