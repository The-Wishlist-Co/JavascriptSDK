// This API gets all wishlist items by either wishlist ID or wishlist Ref
// Note that it is unlikely that a wishlist item ref will rarely be used.

import { axiosInstance } from "../axios/AxiosInstance";

export function getWishlistItems(obj) {
  const params = new URLSearchParams();
  obj.wishlistID && params.append("id", obj.wishlistID);
  obj.wishlistRef && params.append("wishlistRef", obj.wishlistRef);
  if (obj.pageSize) params.append("pageSize", obj.pageSize);
  if (obj.lastItemId) params.append("lastItemId", obj.lastItemId);

  axiosInstance
    .get(`/wsservice/api/wishlist/items?${params.toString()}`, {
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
// let onSuccess = function (lists) {
//     // Successfully fetched all lists
//     console.log("Fetched all Lists", lists);
// }
// // Define error callback
// let onError = function (error) {
//     console.log("Error while fetching all Lists", error);
// }
// const token = process.env.token;
// const tenant = "sunils_electronics";
// const wishlistID = "ff95e17a-2c47-472d-bcfc-244f2e1b2b0d";
// getWishlistItemsByWishlistId({
//     onSuccess,
//     onError,
//     token,
//     tenant,
//     wishlistID
// });
