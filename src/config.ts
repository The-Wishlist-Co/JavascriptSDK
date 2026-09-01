export interface TWCConfig {
  shopDomain: string;
  /**
   * Tenant feature flag for guest (anonymous) wishlists. When `false`,
   * {@link getOrCreateAnonymous} and {@link mergeOnLogin} are silent no-ops.
   * Defaults to `true`.
   */
  anonymousWishlistEnabled?: boolean;
}

let config: TWCConfig | null = null;

/**
 * Initializes the TWC SDK for Shopify proxy-based authentication.
 * Call this once (e.g. on page load) before using any SDK functions without a token.
 *
 * @param cfg - Configuration object.
 * @param cfg.shopDomain - The Shopify store domain (e.g. "mystore.myshopify.com"),
 *   used to construct the proxy URL: https://{shopDomain}/apps/twc-sdk/auth/token
 * @param cfg.anonymousWishlistEnabled - Tenant feature flag for guest wishlists.
 *   Defaults to `true`; set `false` to make the anonymous functions no-ops.
 */
export function initTWC(cfg: TWCConfig): void {
  config = cfg;
}

export function getConfig(): TWCConfig | null {
  return config;
}

/**
 * Whether guest (anonymous) wishlist support is enabled for this tenant.
 * Enabled unless `initTWC` was called with `anonymousWishlistEnabled: false`.
 */
export function isAnonymousWishlistEnabled(): boolean {
  return config?.anonymousWishlistEnabled !== false;
}
