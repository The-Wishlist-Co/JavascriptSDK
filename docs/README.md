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

## API Reference

See the full [API documentation](modules.md) for all available functions and their parameters.
