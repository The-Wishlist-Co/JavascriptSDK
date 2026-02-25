export interface TWCConfig {
  shopDomain: string;
}

let config: TWCConfig | null = null;

/**
 * Initializes the TWC SDK for Shopify proxy-based authentication.
 * Call this once (e.g. on page load) before using any SDK functions without a token.
 *
 * @param cfg - Configuration object.
 * @param cfg.shopDomain - The Shopify store domain (e.g. "mystore.myshopify.com"),
 *   used to construct the proxy URL: https://{shopDomain}/apps/twc-sdk/auth/token
 */
export function initTWC(cfg: TWCConfig): void {
  config = cfg;
}

export function getConfig(): TWCConfig | null {
  return config;
}
