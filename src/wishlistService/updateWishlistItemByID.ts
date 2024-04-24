// /api/wishlist/items
import { axiosInstance } from "../axios/AxiosInstance";

export function updateWishlistItemByID(obj) {
  axiosInstance
    .put(`/wsservice/api/wishlist/items/id=${obj.wishlistItemID}`, obj.updateWishlistItemBody, {
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
