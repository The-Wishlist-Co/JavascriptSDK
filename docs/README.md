@thewishlistco/twc / [Exports](modules.md)

## Install

```
npm install @thewishlistco/twc
```

or with yarn:

```
yarn add @thewishlistco/twc
```

## Authentication

The SDK supports two authentication methods:

### Shopify Proxy Auth (Recommended for Shopify clients)

For Shopify storefronts, the SDK can obtain an access token automatically through the Shopify App Proxy. This means you don't need to manage secrets on the client side.

**Prerequisites:**
1. The TWC Proxy App must be installed on your Shopify store.
2. The Proxy App secret key must be configured in the TWC Admin Console.
3. The customer must be logged in to the storefront.

**Usage:**

```js
import { initTWC, getWishlistByCustomerRef } from "@thewishlistco/twc";

// Call once on page load
initTWC({ shopDomain: "mystore.myshopify.com" });

// No token needed -- the SDK fetches it via the proxy automatically
getWishlistByCustomerRef({
  customerRef: "<customer ref>",
  tenant: "<tenant id>",
  onSuccess: (response) => {
    console.log(response);
  },
  onError: (error) => {
    console.error(error);
  },
});
```

### Direct Token Auth

For non-Shopify clients, or when you manage your own token, pass it directly to each function call:

```js
import { getWishlistByCustomerRef } from "@thewishlistco/twc";

getWishlistByCustomerRef({
  customerRef: "<customer ref>",
  token: "<your token>",
  tenant: "<tenant id>",
  onSuccess: (response) => {
    console.log(response);
  },
  onError: (error) => {
    console.error(error);
  },
});
```

## Guest (anonymous) Wishlists

Shoppers can build a wishlist before they log in. The SDK resolves a durable
identifier in the browser itself and sends it as `onlineSessionID`, so the list
survives closing and reopening the browser.

**Integrators must never construct or pass an identifier** — resolution is entirely
inside the SDK. It prefers Shopify's `_shopify_y` cookie (~1 year, set by the Shopify
edge) and falls back to its own `twc_awid` cookie, minting one when needed, so the
list keeps working when the shopper declines analytics.

### On logged-out pages

```js
import { initTWC, getOrCreateAnonymous } from "@thewishlistco/twc";

initTWC({ shopDomain: "mystore.myshopify.com" });

getOrCreateAnonymous({
  tenant: "<tenant id>",
  onSuccess: (wishlist) => {
    // `null` means the SDK deliberately did nothing (see "Silent no-ops" below).
    if (wishlist) render(wishlist);
  },
  onError: (error) => console.error(error),
});
```

`getOrCreateAnonymous` is create-or-return, so it is safe on every logged-out page
load. It stores the returned `WishlistDto.id`, which is what the merge needs.

Do **not** call it on authenticated pages — it creates an anonymous customer and
wishlist as a side effect.

### On authenticated pages

```js
import { mergeOnLogin } from "@thewishlistco/twc";

mergeOnLogin({
  customerEmail: "<the logged-in customer's real email>",
  tenant: "<tenant id>",
  onSuccess: () => refreshWishlist(),
  onError: (error) => console.error(error),
});
```

`mergeOnLogin` picks up the stored anonymous wishlist id automatically. It is
idempotent, does not block render, and stays quiet if the shopper is not yet a TWC
customer. Merging twice changes nothing.

Optional fields: `anonymousWishlistId` (overrides the stored one), `customerRef`,
`wishlistRef` (target list; otherwise the customer's default), `wishlistName` (used
only if a new default list is created).

On logout — or when a different customer signs in during the same session — call
`resetAnonymousWishlistState()` so a fresh guest list can be created and merged again.

### Silent no-ops

Both functions invoke `onSuccess(null)` and never `onError` when:

- no durable identifier is available (e.g. cookies blocked in private browsing),
- guest wishlists are disabled for the tenant:
  `initTWC({ shopDomain, anonymousWishlistEnabled: false })`,
- (`mergeOnLogin` only) a merge already ran this session, `customerEmail` is blank,
  no anonymous wishlist id is known, or the backend returns 404 because the customer
  or the anonymous list was not found.

Nothing is ever surfaced to the shopper in these cases.

### Token expiry

There is no refresh-token flow, so expiry is handled by re-requesting. If any SDK
call gets a 401 while using a proxy-issued token, the SDK drops the cached token,
requests a new one and retries the call once. Tokens you pass in yourself are left
alone, since the SDK cannot refresh them. `invalidateToken()` is exported if you need
to force a refresh.

## API Reference

See the full [API documentation](docs/modules.md) for all available functions and their parameters.
