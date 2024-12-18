import { axiosInstance } from './chunk-LHUGKW5W.mjs';

// src/wishlistService/createWishlist.ts
function createWishlist(obj) {
  axiosInstance.post(`/wsservice/api/wishlists`, obj.newWishlistBody, {
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

export { createWishlist };
