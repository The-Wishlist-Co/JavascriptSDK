import { axiosInstance } from "../axios/AxiosInstance";
import { resolveToken } from "../auth/proxyAuth";
import { isAnonymousWishlistEnabled } from "../config";
import { resolveAnonymousIdentifier } from "../anonymous/identifier";
import {
  clearAnonymousWishlistId,
  getAnonymousWishlistId,
  hasMergedThisSession,
  markMergedThisSession,
} from "../anonymous/anonymousState";

let mergeInFlight = false;

/**
 * Merges the guest (anonymous) wishlist into the logged-in customer's wishlist.
 *
 * Call this on authenticated page loads. It is idempotent, does not block render,
 * and fails silently to the shopper.
 *
 * The merge looks the customer up by email and 404s if that customer does not exist
 * in TWC yet, so a 404 is treated as a silent no-op rather than an error. The
 * backend does not mark the anonymous list as merged (WCO-4255 #6), so re-firing is
 * guarded client-side for the rest of the session.
 *
 * Silent no-op (invokes `onSuccess(null)`, never `onError`) when the tenant feature
 * flag is off, when a merge has already run this session, when no
 * `anonymousWishlistId` is known, or when `customerEmail` is blank.
 *
 * @group wishlistService
 * @param obj - The configuration object.
 * @param obj.customerEmail - The logged-in customer's real email. Required — the backend looks the customer up by it.
 * @param obj.anonymousWishlistId - The anonymous wishlist id. Defaults to the id stored by {@link getOrCreateAnonymous}.
 * @param obj.customerRef - Optional customer reference.
 * @param obj.wishlistRef - Optional target list to merge into; otherwise the customer's default list.
 * @param obj.wishlistName - Optional name, used only if a new default list is created.
 * @param obj.token - The authentication token. If omitted, the SDK will use proxy auth (requires {@link initTWC}).
 * @param obj.tenant - The tenant identifier.
 * @param obj.onSuccess - Called on a completed merge, or with `null` when the call was a no-op.
 * @param obj.onError - The callback function to be called on error.
 */
export function mergeOnLogin(obj: {
  customerEmail: string;
  anonymousWishlistId?: string;
  customerRef?: string;
  wishlistRef?: string;
  wishlistName?: string;
  token?: string;
  tenant: string;
  onSuccess: (response: any) => void;
  onError: (error: any) => void;
}) {
  const noop = () => {
    if (obj.onSuccess) obj.onSuccess(null);
  };

  if (!isAnonymousWishlistEnabled() || hasMergedThisSession() || mergeInFlight) {
    noop();
    return;
  }

  const anonymousWishlistId =
    obj.anonymousWishlistId || getAnonymousWishlistId();
  if (!anonymousWishlistId || !obj.customerEmail) {
    noop();
    return;
  }

  const mergeWishlistBody: { [key: string]: any } = {
    anonymousWishlistId,
    customerEmail: obj.customerEmail,
  };

  const onlineSessionID = resolveAnonymousIdentifier();
  if (onlineSessionID) mergeWishlistBody.onlineSessionID = onlineSessionID;
  if (obj.customerRef) mergeWishlistBody.customerRef = obj.customerRef;
  if (obj.wishlistRef) mergeWishlistBody.wishlistRef = obj.wishlistRef;
  if (obj.wishlistName) mergeWishlistBody.wishlistName = obj.wishlistName;

  mergeInFlight = true;
  const done = () => {
    mergeInFlight = false;
  };

  resolveToken(obj.token)
    .then((token) => {
      return axiosInstance.post(
        `/wsservice/api/wishlists/merge`,
        mergeWishlistBody,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            "X-TWC-Tenant": obj.tenant,
          },
        }
      );
    })
    .then((response) => {
      // Merge returns 200 with an empty body (WCO-4255 #7) — there is nothing to read.
      done();
      markMergedThisSession();
      clearAnonymousWishlistId();
      if (obj.onSuccess) {
        obj.onSuccess(response.data || null);
      }
    })
    .catch((error) => {
      done();
      // 404: the customer does not exist in TWC yet, or the anonymous list is gone.
      // Neither is actionable for the shopper — stay quiet and stop re-firing this
      // session. A later session retries.
      if (error?.response?.status === 404) {
        markMergedThisSession();
        noop();
        return;
      }
      if (obj.onError) {
        obj.onError(error?.response || error);
      }
    });
}
