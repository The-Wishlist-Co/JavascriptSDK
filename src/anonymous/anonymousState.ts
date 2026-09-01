/**
 * Client-side state for the anonymous wishlist flow.
 *
 * Two things are tracked:
 *
 *  - `anonymousWishlistId` — the `WishlistDto.id` returned by create-or-get.
 *    The merge call needs it, so it is persisted across page loads.
 *  - the merge guard — the backend does not mark an anonymous list as merged
 *    (WCO-4255 #6), so merging twice in one session is guarded here.
 *
 * Storage is best-effort: every access is wrapped, and in-memory fallbacks keep
 * the flow working when Web Storage is unavailable (private browsing, blocked
 * site data, SSR).
 */

const WISHLIST_ID_KEY = "twc_anonymous_wishlist_id";
const MERGED_KEY = "twc_anonymous_wishlist_merged";

let inMemoryWishlistId: string | null = null;
let inMemoryMerged = false;

function localStore(): Storage | null {
  try {
    return typeof localStorage !== "undefined" ? localStorage : null;
  } catch {
    return null;
  }
}

function sessionStore(): Storage | null {
  try {
    return typeof sessionStorage !== "undefined" ? sessionStorage : null;
  } catch {
    return null;
  }
}

/**
 * Returns the persisted anonymous wishlist id, or `null` if none is stored.
 *
 * @group anonymousWishlist
 */
export function getAnonymousWishlistId(): string | null {
  try {
    const stored = localStore()?.getItem(WISHLIST_ID_KEY);
    if (stored) return stored;
  } catch {
    /* fall through to the in-memory copy */
  }
  return inMemoryWishlistId;
}

export function setAnonymousWishlistId(id: string): void {
  inMemoryWishlistId = id;
  try {
    localStore()?.setItem(WISHLIST_ID_KEY, id);
  } catch {
    /* in-memory copy is enough for this page load */
  }
}

/**
 * Forgets the stored anonymous wishlist id. Called automatically after a
 * successful merge; exposed for integrators that need to reset state (e.g. logout).
 *
 * @group anonymousWishlist
 */
export function clearAnonymousWishlistId(): void {
  inMemoryWishlistId = null;
  try {
    localStore()?.removeItem(WISHLIST_ID_KEY);
  } catch {
    /* nothing to do */
  }
}

export function hasMergedThisSession(): boolean {
  try {
    if (sessionStore()?.getItem(MERGED_KEY) === "true") return true;
  } catch {
    /* fall through to the in-memory flag */
  }
  return inMemoryMerged;
}

export function markMergedThisSession(): void {
  inMemoryMerged = true;
  try {
    sessionStore()?.setItem(MERGED_KEY, "true");
  } catch {
    /* in-memory flag is enough for this page load */
  }
}

/**
 * Clears all anonymous wishlist state: the stored `anonymousWishlistId` and the
 * merge guard.
 *
 * Call this on logout, or when a different customer signs in during the same
 * session, so a subsequent guest list can be created and merged again.
 *
 * @group anonymousWishlist
 */
export function resetAnonymousWishlistState(): void {
  clearAnonymousWishlistId();
  inMemoryMerged = false;
  try {
    sessionStore()?.removeItem(MERGED_KEY);
  } catch {
    /* nothing to do */
  }
}
