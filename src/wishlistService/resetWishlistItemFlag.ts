// Reset the notifyMe and preRelease flag in the wishlist items with given productRef or variantRef
// You can reset the flags based on productRef OR variantRef but not possbile to update both flags in a single call- you have to do them separately.
// Must pass either 'productRef' OR 'variantRef' AND either 'notifyMe' OR 'preRelease'

import { axiosInstance } from "../axios/AxiosInstance";

export function resetWishlistItemFlag(obj) {
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
    .post(
      "/api/wishlist/items/resetFlag",
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
