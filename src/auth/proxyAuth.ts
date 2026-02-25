import axios from "axios";
import { getConfig } from "../config";

let cachedToken: string | null = null;
let cacheExpiry: number = 0;
const CACHE_TTL_MS = 4 * 60 * 1000;

/**
 * Resolves an authentication token for TWC API calls.
 *
 * - If a token is provided directly, it is returned as-is (zero overhead).
 * - If no token is provided, fetches one from the Shopify App Proxy
 *   configured via {@link initTWC}. The proxy token is cached client-side
 *   to avoid repeated network calls.
 *
 * @param token - An explicit bearer token. When supplied, proxy auth is bypassed.
 * @returns A promise that resolves to a valid access token string.
 * @throws If no token is provided and `initTWC` has not been called.
 * @throws If the proxy request fails or returns an unsuccessful response.
 */
export async function resolveToken(token?: string): Promise<string> {
  if (token) return token;

  const config = getConfig();
  if (!config) {
    throw new Error(
      "TWC SDK: No token provided and proxy auth is not configured. " +
        "Either pass a token directly or call initTWC({ shopDomain }) first."
    );
  }

  if (cachedToken && Date.now() < cacheExpiry) {
    return cachedToken;
  }

  const proxyUrl = `https://${config.shopDomain}/apps/twc-sdk/auth/token`;
  const response = await axios.get(proxyUrl);

  if (!response.data?.success || !response.data?.data?.access_token) {
    throw new Error(
      `TWC SDK: Proxy auth failed — ${response.data?.message || "unknown error"}`
    );
  }

  cachedToken = response.data.data.access_token;
  cacheExpiry = Date.now() + CACHE_TTL_MS;
  return cachedToken!;
}
