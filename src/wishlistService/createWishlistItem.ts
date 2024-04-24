import { axiosInstance } from "../axios/AxiosInstance";

export function createWishlistItem(obj) {
  axiosInstance
    .post(`/wsservice/api/wishlist/items`, obj.createWishlistItembody, {
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
