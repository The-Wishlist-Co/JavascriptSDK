// This API gets all wishlist items by either wishlist ID or wishlist Ref
// Note that it is unlikely that a wishlist item ref will rarely be used.

import { axiosInstance } from "../axios/AxiosInstance";

/**
 * Retrieves wishlist items based on the provided parameters.
 *
 * @group wishlistService
 * @param obj - The configuration object.
 * @param obj.wishlistID - The ID of the wishlist (either wishlistID or wishlistRef must be defined).
 * @param obj.wishlistRef - The reference of the wishlist (either wishlistID or wishlistRef must be defined).
 * @param obj.pageSize - The number of items to retrieve per page.
 * @param obj.lastItemId - The ID of the last item retrieved.
 * @param obj.token - The authentication token.
 * @param obj.tenant - The tenant information.
 * @param obj.onSuccess - The callback function to handle successful response.
 * @param obj.onError - The callback function to handle error response.
 */
export function getWishlistItems(obj: {
  wishlistID: string;
  wishlistRef: string;
  pageSize?: string;
  lastItemId?: string;
  token: string;
  tenant: string;
  onSuccess: (response: any) => void;
  onError: (error: any) => void;
}) {
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
