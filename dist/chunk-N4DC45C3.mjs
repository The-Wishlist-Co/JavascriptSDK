import { axiosInstance } from './chunk-LHUGKW5W.mjs';

// src/wishlistService/updateWishlistByRef.ts
function updateWishlistByRef(obj) {
  axiosInstance.put(`/wsservice/api/wishlists/ref=${obj.wishlistRef}`, obj.updateWishlistByIDBody, {
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

export { updateWishlistByRef };
