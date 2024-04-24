import { axiosInstance } from "../axios/AxiosInstance";

export function updateWishlistByRef(obj) {
  axiosInstance
    .put(`/wsservice/api/wishlists/ref=${obj.wishlistRef}`, obj.updateWishlistByIDBody, {
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
