import { axiosInstance } from './chunk-LHUGKW5W.mjs';

// src/wishlistService/deleteWishlistItemByRef.ts
function deleteWishlistItemByRef(obj) {
  axiosInstance.delete(`/wsservice/api/wishlist/items/${obj.wishlistItemRef}/ref`, {
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

export { deleteWishlistItemByRef };
