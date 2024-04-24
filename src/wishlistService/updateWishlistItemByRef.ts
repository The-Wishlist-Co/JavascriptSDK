// Bad Gateway error
import { axiosInstance } from "../axios/AxiosInstance";

export function updateWishlistItemByRef(obj) {
  axiosInstance
    .put(`/wsservice/api/wishlist/items/ref=${obj.wishlistItemRef}`, obj.updateWishlistItemBody, {
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
