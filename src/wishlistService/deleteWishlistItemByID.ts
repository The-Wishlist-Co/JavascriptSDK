// /api/wishlist/items/{id}
import { axiosInstance } from "../axios/AxiosInstance";

export function deleteWishlistItemByID(obj) {
  axiosInstance
    .delete(`/wsservice/api/wishlist/items/${obj.wishlistItemID}`, {
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