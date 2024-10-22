import { axiosInstance } from './chunk-LHUGKW5W.mjs';

// src/wishlistService/deleteWishlist.ts
function deleteWishlist(obj) {
  const params = new URLSearchParams();
  obj.wishlistID && params.append("id", obj.wishlistID);
  obj.wishlistRef && params.append("wishlistRef", obj.wishlistRef);
  axiosInstance.delete(`/wsservice/api/wishlists?${params.toString()}`, {
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

export { deleteWishlist };
