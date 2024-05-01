// /api/wishlists
// Get wishlist by wishlistID or wishlistRef
// This API supercedes the individual APIs for get wishlist by ID and get Wishlist by Ref and allows either ref or ID to be used.

import { axiosInstance } from "../axios/AxiosInstance";

/**
 * Retrieves the wishlist data based on the provided parameters.
 *
 * @group wishlistService
 * @param obj - The configuration object.
 * @param obj.wishlistID - The ID of the wishlist to retrieve (either wishlistID or wishlistRef must be defined).
 * @param obj.wishlistRef - The reference of the wishlist to retrieve (either wishlistID or wishlistRef must be defined).
 * @param obj.pageSize - The number of items per page to retrieve.
 * @param obj.lastItemId - The ID of the last item retrieved.
 * @param obj.token - The authentication token.
 * @param obj.tenant - The tenant identifier.
 * @param obj.onSuccess - The callback function to handle the successful response.
 * @param obj.onError - The callback function to handle any errors.
 */
export function getWishlist(obj: {
  wishlistID?: string;
  wishlistRef?: string;
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
    .get(`/wsservice/api/wishlists?${params.toString()}`, {
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
