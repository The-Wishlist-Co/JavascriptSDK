import { axiosInstance } from "../axios/AxiosInstance";
import { resolveToken } from "../auth/proxyAuth";
import { isAnonymousWishlistEnabled } from "../config";
import { resolveAnonymousIdentifier } from "../anonymous/identifier";
import { setAnonymousWishlistId } from "../anonymous/anonymousState";

/**
 * Gets the guest (anonymous) wishlist for this browser, creating it if it does not
 * exist yet.
 *
 * The SDK resolves a durable identifier itself (`_shopify_y`, else `twc_awid`,
 * minting one if needed) and sends it as `onlineSessionID`. Integrators must never
 * construct or pass an identifier.
 *
 * `POST /wsservice/api/wishlists/anonymous` is create-or-return, so this is safe to
 * call on every logged-out page load and needs no separate GET. The returned
 * `WishlistDto.id` is persisted as the `anonymousWishlistId` that
 * {@link mergeOnLogin} needs.
 *
 * Call this on logged-out pages only — it creates an anonymous customer and
 * wishlist as a side effect.
 *
 * Silent no-op (invokes `onSuccess(null)`, never `onError`) when the tenant feature
 * flag is off, or when no durable identifier is available (e.g. cookies blocked).
 *
 * @group wishlistService
 * @param obj - The configuration object.
 * @param obj.token - The authentication token. If omitted, the SDK will use proxy auth (requires {@link initTWC}).
 * @param obj.tenant - The tenant identifier.
 * @param obj.onSuccess - Called with the `WishlistDto`, or with `null` when the call was a no-op.
 * @param obj.onError - The callback function to be called on error.
 */
export function getOrCreateAnonymous(obj: {
  token?: string;
  tenant: string;
  onSuccess: (response: any) => void;
  onError: (error: any) => void;
}) {
  if (!isAnonymousWishlistEnabled()) {
    if (obj.onSuccess) obj.onSuccess(null);
    return;
  }

  const onlineSessionID = resolveAnonymousIdentifier();
  if (!onlineSessionID) {
    if (obj.onSuccess) obj.onSuccess(null);
    return;
  }

  resolveToken(obj.token)
    .then((token) => {
      return axiosInstance.post(`/wsservice/api/wishlists/anonymous`, undefined, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "X-TWC-Tenant": obj.tenant,
        },
        params: { onlineSessionID },
      });
    })
    .then((response) => {
      if (response.data?.id) {
        setAnonymousWishlistId(response.data.id);
      }
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
