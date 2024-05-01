// This API supercedes the individual delete wishlist by ID and delete wishlist by Ref and provides a single endpoint to delete by either ID or Ref.
import { axiosInstance } from "../axios/AxiosInstance";

/**
 * Deletes a wishlist by either ID or Ref.
 *
 * @group wishlistService
 * @param obj - The configuration object.
 * @param obj.wishlistID - The ID of the wishlist to delete (either wishlistID or wishlistRef must be defined).
 * @param obj.wishlistRef - The reference of the wishlist to delete (either wishlistID or wishlistRef must be defined).
 * @param obj.token - The authentication token.
 * @param obj.tenant - The tenant identifier.
 * @param obj.onSuccess - The callback function to be called when the deletion is successful.
 * @param obj.onError - The callback function to be called when an error occurs during deletion.
 */
export function deleteWishlist(obj: {
  wishlistID?: string;
  wishlistRef?: string;
  token: string;
  tenant: string;
  onSuccess: (response: any) => void;
  onError: (error: any) => void;
}) {
  const params = new URLSearchParams();
  obj.wishlistID && params.append("id", obj.wishlistID);
  obj.wishlistRef && params.append("wishlistRef", obj.wishlistRef);

  axiosInstance
    .delete(`/wsservice/api/wishlists?${params.toString()}`, {
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
