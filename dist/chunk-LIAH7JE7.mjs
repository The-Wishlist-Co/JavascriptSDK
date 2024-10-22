import { axiosInstance } from './chunk-LHUGKW5W.mjs';

// src/wishlistService/getWishlistByID.ts
function getWishlistByID(obj) {
  const params = {};
  if (obj.pageSize) {
    params.pageSize = obj.pageSize;
  }
  if (obj.lastItemId) {
    params.lastItemId = obj.lastItemId;
  }
  axiosInstance.get(`/wsservice/api/wishlists/${obj.wishlistID}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${obj.token}`,
      "X-TWC-Tenant": obj.tenant
    },
    params
    // Include pagination parameters in the request if any
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

export { getWishlistByID };
