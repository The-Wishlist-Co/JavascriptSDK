import { axiosInstance } from './chunk-LHUGKW5W.mjs';

// src/wishlistService/updateWishlistItem.ts
function updateWishlistItem(obj) {
  axiosInstance.put(`/wsservice/api/wishlist/items`, obj.updateWishlistItemBody, {
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

export { updateWishlistItem };