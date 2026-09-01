/**
 * Durable anonymous identifier resolution.
 *
 * The value resolved here is passed as the existing `onlineSessionID` parameter
 * to the anonymous wishlist endpoints. The Shopify session ID must NOT be used —
 * it rotates, so a returning shopper would get a fresh anonymous customer and an
 * empty list.
 *
 * Preference order:
 *  1. `_shopify_y` — set by the Shopify edge, ~1 year expiry, not subject to the
 *     ITP cap on JS-set cookies. Absent when the shopper declines analytics.
 *  2. `twc_awid`   — set by this SDK. Survives an analytics decline, but Safari's
 *     ITP caps JS-set cookies at ~7 days.
 *  3. Mint a new `twc_awid` (UUID v4) and store it.
 *
 * Integrators must never construct or pass an identifier — the SDK owns resolution.
 */

const SHOPIFY_ANALYTICS_COOKIE = "_shopify_y";
const TWC_ANONYMOUS_COOKIE = "twc_awid";
const ONE_YEAR_IN_SECONDS = 60 * 60 * 24 * 365;

function readCookie(name: string): string | null {
  if (typeof document === "undefined") return null;

  let jar: string;
  try {
    jar = document.cookie || "";
  } catch {
    return null;
  }

  const prefix = `${name}=`;
  for (const entry of jar.split(";")) {
    const candidate = entry.trim();
    if (!candidate.startsWith(prefix)) continue;

    const raw = candidate.slice(prefix.length);
    if (!raw) return null;
    try {
      return decodeURIComponent(raw) || null;
    } catch {
      return raw;
    }
  }
  return null;
}

function writeCookie(name: string, value: string): void {
  if (typeof document === "undefined") return;

  const isSecureContext =
    typeof location !== "undefined" && location.protocol === "https:";

  try {
    document.cookie =
      `${name}=${encodeURIComponent(value)}` +
      `; path=/` +
      `; max-age=${ONE_YEAR_IN_SECONDS}` +
      `; SameSite=Lax` +
      (isSecureContext ? `; Secure` : "");
  } catch {
    /* cookies blocked — resolution reports failure via the read-back below */
  }
}

function toHex(value: number, width: number): string {
  let hex = value.toString(16);
  while (hex.length < width) hex = `0${hex}`;
  return hex;
}

function mintIdentifier(): string {
  const webCrypto: any =
    typeof globalThis !== "undefined" ? (globalThis as any).crypto : undefined;

  if (typeof webCrypto?.randomUUID === "function") {
    return webCrypto.randomUUID();
  }

  if (typeof webCrypto?.getRandomValues === "function") {
    const bytes = new Uint8Array(16);
    webCrypto.getRandomValues(bytes);
    bytes[6] = (bytes[6] & 0x0f) | 0x40; // version 4
    bytes[8] = (bytes[8] & 0x3f) | 0x80; // variant 10
    const hex: string[] = [];
    for (let i = 0; i < bytes.length; i++) {
      hex.push(toHex(bytes[i], 2));
    }
    return (
      `${hex.slice(0, 4).join("")}-${hex.slice(4, 6).join("")}-` +
      `${hex.slice(6, 8).join("")}-${hex.slice(8, 10).join("")}-` +
      `${hex.slice(10, 16).join("")}`
    );
  }

  // Last resort for environments without Web Crypto. Not cryptographically
  // random, but the identifier only needs to be collision-free in practice.
  const chunk = (length: number) => {
    let out = "";
    while (out.length < length) {
      out += toHex(Math.floor(Math.random() * 0x10000), 4);
    }
    return out.slice(0, length);
  };
  return `${chunk(8)}-${chunk(4)}-4${chunk(3)}-${chunk(4)}-${chunk(12)}`;
}

/**
 * Resolves the durable anonymous identifier for this browser, minting and
 * persisting one if needed.
 *
 * @group anonymousWishlist
 * @returns The identifier to send as `onlineSessionID`, or `null` when no
 *   identifier is available and none can be persisted (e.g. cookies blocked).
 *   Callers must treat `null` as a silent no-op.
 */
export function resolveAnonymousIdentifier(): string | null {
  const shopifyAnalyticsId = readCookie(SHOPIFY_ANALYTICS_COOKIE);
  if (shopifyAnalyticsId) return shopifyAnalyticsId;

  const existing = readCookie(TWC_ANONYMOUS_COOKIE);
  if (existing) return existing;

  const minted = mintIdentifier();
  writeCookie(TWC_ANONYMOUS_COOKIE, minted);

  // Read back: if the cookie did not stick there is no durable identifier and
  // the anonymous feature must stay silent rather than create a throwaway list.
  return readCookie(TWC_ANONYMOUS_COOKIE) ? minted : null;
}
