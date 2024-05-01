import { axiosInstance } from "../axios/AxiosInstance";

/**
 * Creates a wishlist item.
 *
 * @group wishlistService
 * @param obj - The configuration object.
 * @param obj.createWishlistItembody - The body of the wishlist item to be created. See https://the-wishlist-co.github.io/docs/wishlistSvcAPI.html#create-a-wishlist-item for information on the fields.
 * @param obj.token - The authentication token.
 * @param obj.tenant - The tenant identifier.
 * @param obj.onSuccess - The callback function to be called on successful creation of the wishlist item.
 * @param obj.onError - The callback function to be called on error during the creation of the wishlist item.
 */
export function createWishlistItem(obj: {
  createWishlistItembody: { [key: string]: any };
  token: string;
  tenant: string;
  onSuccess: (response: any) => void;
  onError: (error: any) => void;
}) {
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
