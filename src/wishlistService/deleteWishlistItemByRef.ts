import { axiosInstance } from "../axios/AxiosInstance";

export function deleteWishlistItemByRef(obj) {
  axiosInstance
    .delete(`/wsservice/api/wishlist/items/${obj.wishlistItemRef}/ref`, {
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
