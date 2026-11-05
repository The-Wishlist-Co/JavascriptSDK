# @thewishlistco/twc

The TWC JavaScript SDK: a convenience wrapper around the TWC REST API for wishlists and customers.

> **Server-side only.** Use this library in server code, for example a Node back end, Shopify Hydrogen loaders and actions, or Next.js route handlers and server actions. Every function needs an access token from your TWC server API client. That token must never reach a browser, so never use this library in browser code.

## Install

```
npm install @thewishlistco/twc
```

or with yarn:

```
yarn add @thewishlistco/twc
```

## Authentication

TWC issues a confidential API client (client ID and secret) for your store. Contact TWC for your credentials.

Your server requests an access token with the OAuth 2.0 client-credentials grant, and passes it to every function as `token`, together with your `tenant`:

```js
// Server code only. Cache the token and request a new one shortly before it expires.
async function getServerToken() {
  const res = await fetch(
    `https://auth.au-aws.thewishlist.io/auth/realms/${process.env.TWC_TENANT}/protocol/openid-connect/token`,
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        grant_type: "client_credentials",
        client_id: process.env.TWC_CLIENT_ID,
        client_secret: process.env.TWC_CLIENT_SECRET,
      }),
    }
  );
  if (!res.ok) throw new Error(`TWC token request failed: ${res.status}`);
  return (await res.json()).access_token; // also returns expires_in (seconds)
}
```

## Security

- **Keep credentials on your server.**
  - Store the client secret in your secrets manager or server environment variables.
  - Never put the secret or a token in browser code, JavaScript bundles, source maps, logs or a code repository.
  - Never return a token to the browser from an endpoint of your own.
  - Use separate credentials for staging and production.
  - Tell TWC immediately if you suspect exposure, and we'll rotate them.
- **Act only for the logged-in customer.** Your credentials can read and change data for every customer in your store, so your server must:
  - take the customer's email and Shopify customer ID from the authenticated session, never from the request;
  - before using a `wishlistID` or `wishlistItemID` that came from the browser, check that it belongs to that customer;
  - return only the fields your UI needs, never raw TWC responses.

## Usage: show a customer's wishlists

Load the wishlist list first, then the items for the wishlist the customer opens:

```js
import { getWishlistsByCustomer, getWishlistItems } from "@thewishlistco/twc";

const customerRef = session.customer.id; // the Shopify customer ID from the verified session
const token = await getServerToken();
const tenant = process.env.TWC_TENANT;

// 1. All wishlists (no items): totalItemsAllWishlists for the header count, plus each list's name and item count
getWishlistsByCustomer({
  customerRef,
  token,
  tenant,
  onSuccess: (response) => { /* response.totalItemsAllWishlists, response.wishlists */ },
  onError: (error) => { /* handle; never log the token */ },
});

// 2. Items for the wishlist the customer opens (paginated with pageSize / lastItemId).
//    wishlistID must be one of this customer's wishlists from step 1.
getWishlistItems({
  wishlistID,
  pageSize: "20",
  token,
  tenant,
  onSuccess: (response) => { /* render items */ },
  onError: (error) => { /* handle */ },
});
```

## Functions

**Wishlists:** `getWishlistsByCustomer`, `getWishlist`, `createWishlist`, `updateWishlist`, `deleteWishlist`

**Wishlist items:** `getWishlistItems`, `getWishlistItemByID`, `getWishlistItemByRef`, `createWishlistItem`, `updateWishlistItem`, `deleteWishlistItemByID`, `deleteWishlistItemByRef`, `getItemsPopularity`

**Customers:** `getCustomerByID`, `getCustomerByRef`, `createCustomer`, `updateCustomer`, `updateCustomerByID`

See the full [API documentation](docs/modules.md) for every function's parameters.

## Upgrading from 0.2

Version 0.3.0 is server-side only.

- `token` is required on every function. Shopify proxy authentication (`initTWC`, `resolveToken`, `invalidateToken`) has been removed: the proxy token cannot call these APIs.
- Guest wishlist functions (`getOrCreateAnonymous`, `mergeOnLogin`, `resetAnonymousWishlistState`, `getAnonymousWishlistId`, `resolveAnonymousIdentifier`) have been removed. Guest wishlists are not currently supported.
- Functions that called deprecated endpoints have been removed. Use these instead:

| Removed | Use instead |
| --- | --- |
| `getWishlistByCustomer`, `getWishlistByCustomerID`, `getWishlistByCustomerRef` | `getWishlistsByCustomer`, then `getWishlistItems` |
| `getWishlistByID`, `getWishlistByRef` | `getWishlist` |
| `updateWishlistByID`, `updateWishlistByRef` | `updateWishlist` |
| `deleteWishlistByID`, `deleteWishlistByRef` | `deleteWishlist` |
| `updateWishlistItemByID`, `updateWishlistItemByRef` | `updateWishlistItem` |
| `updateCustomerByRef` | `updateCustomer` |

- Back-office functions have been removed: `createBulkCustomers`, `customerLookup`, `deleteCustomer`, `deleteCustomerByID`, `deleteAllWishlist`, `getCustomersWithFlag`, `resetWishlistItemFlag`.
