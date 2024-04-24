// /api/wishlists
// Get wishlist by wishlistID or wishlistRef
// This API supercedes the individual APIs for get wishlist by ID and get Wishlist by Ref and allows either ref or ID to be used.

import { axiosInstance } from "../axios/AxiosInstance";

export function getWishlist(obj) {
  const params = new URLSearchParams();
  obj.wishlistID && params.append("id", obj.wishlistID);
  obj.wishlistRef && params.append("wishlistRef", obj.wishlistRef);
  if (obj.pageSize) params.append("pageSize", obj.pageSize);
  if (obj.lastItemId) params.append("lastItemId", obj.lastItemId);

  axiosInstance
    .get(`/wsservice/api/wishlists?${params.toString()}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${obj.token}`,
        "X-TWC-Tenant": obj.tenant,
      },
    })
    .then((response) => {
      obj.onSuccess(response.data);
    })
    .catch((error) => {
      obj.onError(error?.response || error);
    });
}
