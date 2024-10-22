import { axiosInstance } from './chunk-LHUGKW5W.mjs';

// src/wishlistService/getWishlistByRef.ts
function getWishlistByRef(obj) {
  axiosInstance.get(`/wsservice/api/wishlists/${obj.wishlistRef}/byref`, {
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

export { getWishlistByRef };
