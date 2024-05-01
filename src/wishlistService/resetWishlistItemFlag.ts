// Reset the notifyMe and preRelease flag in the wishlist items with given productRef or variantRef
// You can reset the flags based on productRef OR variantRef but not possbile to update both flags in a single call- you have to do them separately.
// Must pass either 'productRef' OR 'variantRef' AND either 'notifyMe' OR 'preRelease'

import { axiosInstance } from "../axios/AxiosInstance";

/**
 * Resets the wishlist item flag.
 *
 * @group wishlistService
 * @param obj - The configuration object.
 * @param obj.productRef - The product reference (either productRef or variantRef must be defined).
 * @param obj.variantRef - The variant reference (either productRef or variantRef must be defined).
 * @param obj.notifyMe - Indicates whether to notify the user (either notifyMe or preRelease must be defined).
 * @param obj.preRelease - Indicates whether the item is a pre-release (either notifyMe or preRelease must be defined).
 * @param obj.token - The authentication token.
 * @param obj.tenant - The tenant identifier.
 * @param obj.onSuccess - The callback function to be called on success.
 * @param obj.onError - The callback function to be called on error.
 */
export function resetWishlistItemFlag(obj: {
  productRef?: string;
  variantRef?: string;
  notifyMe?: boolean;
  preRelease?: boolean;
  token: string;
  tenant: string;
  onSuccess: (response: any) => void;
  onError: (error: any) => void;
}) {
  // Prepare query parameters
  const params: any = {};
  if (obj.productRef) {
    params.productRef = obj.productRef;
  } else if (obj.variantRef) {
    params.variantRef = obj.variantRef;
  }
  if (obj.notifyMe) {
    params.notifyMe = obj.notifyMe.toString(); // Assuming notifyMe is a boolean, convert to string if necessary
  } else if (obj.preRelease) {
    params.preRelease = obj.preRelease.toString(); // Same assumption as above
  }

  axiosInstance
    .put(
      "/wsservice/api/wishlist/items/resetFlag",
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${obj.token}`,
          "X-TWC-Tenant": obj.tenant,
        },
        params: params,
      }
    )
    .then((response) => {
      if (obj.onSuccess) {
        obj.onSuccess(response.data);
      }
    })
    .catch((error) => {
      if (obj.onError) {
        obj.onError(error?.response || error);
      }
    });
}
