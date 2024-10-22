import { axiosInstance } from './chunk-LHUGKW5W.mjs';

// src/wishlistService/getWishlistItems.ts
function getWishlistItems(obj) {
  const params = new URLSearchParams();
  obj.wishlistID && params.append("id", obj.wishlistID);
  obj.wishlistRef && params.append("wishlistRef", obj.wishlistRef);
  if (obj.pageSize)
    params.append("pageSize", obj.pageSize);
  if (obj.lastItemId)
    params.append("lastItemId", obj.lastItemId);
  axiosInstance.get(`/wsservice/api/wishlist/items?${params.toString()}`, {
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

export { getWishlistItems };
