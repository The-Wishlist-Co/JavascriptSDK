// /wsservice/api/wishlist/items/ref/Item 6
import { axiosInstance } from "../axios/AxiosInstance";

export function getWishlistItemByRef(obj) {
  axiosInstance
    .get(`/wsservice/api/wishlist/items/ref/${obj.wishlistItemRef}`, {
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
