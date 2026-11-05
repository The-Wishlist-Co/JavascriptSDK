# @thewishlistco/twc

The TWC JavaScript SDK for wishlists and customers.

> **Server-side only.** Use this library in server code, for example a Node 18+ back end, Shopify Hydrogen loaders and actions, or Next.js route handlers and server actions. It holds your TWC server credentials, which must never reach a browser. The client refuses to start in a browser.

## Install

```
npm install @thewishlistco/twc
```

or with yarn:

```
yarn add @thewishlistco/twc
```

## Quick start

TWC issues a confidential API client (client ID and secret) for your store. Contact TWC for your credentials, and keep them in your server's secrets manager or environment variables.

```js
import { createTWCClient } from "@thewishlistco/twc";

// Create once per process and reuse it. The client requests and refreshes its own access token.
const twc = createTWCClient({
  tenant: process.env.TWC_TENANT,
  clientId: process.env.TWC_CLIENT_ID,
  clientSecret: process.env.TWC_CLIENT_SECRET,
});

// The logged-in shopper, from the verified Shopify session on your server. Never from the request.
const customer = { customerRef: session.customer.id, email: session.customer.email };

// 1. All wishlists (no items): header count, plus each list's name and item count
const { totalItemsAllWishlists, wishlists } = await twc.getWishlists(customer);

// 2. Items for the wishlist the customer opens (paginated)
const page = await twc.getWishlistItems(customer, wishlists[0].id, { pageSize: 20 });
// next page: { pageSize: 20, lastItemId: page.lastEvaluatedItemId }
```

## The client

`createTWCClient({ tenant, clientId, clientSecret, fetch? })` returns a client whose operations act for one shopper at a time. You pass `customer = { customerRef, email }` from the verified Shopify session. **Every operation on a wishlist or item first checks that it belongs to that customer.** If it doesn't, the operation fails with `not_found` and nothing is changed.

| Operation | What it does |
| --- | --- |
| `getWishlists(customer)` | All of the customer's wishlists, without items, and `totalItemsAllWishlists`. Empty if the customer has no TWC record yet. |
| `getWishlist(customer, wishlistId)` | One of the customer's wishlists. |
| `getWishlistItems(customer, wishlistId, { pageSize?, lastItemId? })` | One page of items. Use `lastEvaluatedItemId` from the result to get the next page. |
| `createWishlist(customer, { name, description?, isPrivate? })` | Creates a wishlist. Creates or links the customer's TWC record first if needed. |
| `renameWishlist(customer, wishlistId, name)` | Renames one of the customer's wishlists. |
| `deleteWishlist(customer, wishlistId)` | Deletes one of the customer's wishlists. |
| `addItem(customer, wishlistId, { productRef, variantRef, wishlistItemRef?, attributeGroups? })` | Adds a product variant to one of the customer's wishlists. |
| `changeItemVariant(customer, itemId, variantRef)` | Changes an item's selected variant (e.g. size or colour). |
| `removeItem(customer, itemId)` | Removes an item from one of the customer's wishlists. |
| `ensureCustomer(customer, { firstName?, lastName? })` | Finds the customer's TWC record, creating it or linking the Shopify login to an existing email-only record. Fails with `customer_conflict` if the email belongs to a record linked to another Shopify customer. |
| `getSharedWishlist(wishlistId, { pageSize?, lastItemId? })` | For a share page: the list name and products only (`{ name, items: [{ productRef, variantRef }], lastItemId? }`). All customer data is removed. A private or deleted wishlist is not found. |
| `registerInterest({ email, variantRef, kind, ... })` | Notify Me (`kind: "notifyMe"`) or Coming Soon (`kind: "comingSoon"`) sign-up. Optional: `firstName`, `lastName`, `mobile`, `countryCode`, `provinceCode`, `marketId`, `marketHandle`, `subscribe`, `subscribeSms`. |
| `getInterests(customer)` | The customer's Notify Me / Coming Soon interests, or `null` if none. |
| `cancelInterest(customer, variantRef, kind)` | Cancels one of the customer's interests. |

### Errors

Every failure is a `TWCError` with `status` (HTTP status, or 0 if there was no response), `code` and `message`. Codes: `bad_request`, `unauthorized`, `forbidden`, `not_found`, `conflict`, `rate_limited`, `server_error`, `network_error`, `invalid_argument`, `customer_conflict`, `browser_not_supported`, `auth_failed`.

Errors never contain your client secret, tokens, response bodies or values from the request URL, so they are safe to log.

```js
import { TWCError } from "@thewishlistco/twc";

try {
  await twc.removeItem(customer, itemId);
} catch (e) {
  if (e instanceof TWCError && e.code === "not_found") return notFound();
  throw e;
}
```

## Security

- **Keep credentials on your server.**
  - Never put the client secret or a token in browser code, JavaScript bundles, source maps, logs or a code repository.
  - Never return a token to the browser from an endpoint of your own.
  - Use separate credentials for staging and production.
  - Tell TWC immediately if you suspect exposure, and we'll rotate them.
- **Take the customer from the session.** Build `customer` from the authenticated Shopify session on your server, never from the request body, query string or cookies you set yourself.
- **Return only what your UI needs.** Don't pass raw TWC responses through to the browser.
- **Protect public endpoints.** If you expose `registerInterest` to anonymous visitors, rate-limit the endpoint and add bot protection, because each sign-up can send email.

## Individual functions

The library also exports one function per TWC API call. These take a `token` and `tenant` on every call and do **not** check that a wishlist or item belongs to the shopper, so your code must. Prefer the client.

Request the token with the OAuth 2.0 client-credentials grant from `https://auth.au-aws.thewishlist.io/auth/realms/{tenant}/protocol/openid-connect/token`, and cache it until shortly before it expires.

**Wishlists:** `getWishlistsByCustomer`, `getWishlist`, `createWishlist`, `updateWishlist`, `deleteWishlist`

**Wishlist items:** `getWishlistItems`, `getWishlistItemByID`, `getWishlistItemByRef`, `createWishlistItem`, `updateWishlistItem`, `deleteWishlistItemByID`, `deleteWishlistItemByRef`, `getItemsPopularity`

**Customers:** `getCustomerByID`, `getCustomerByRef`, `createCustomer`, `updateCustomer`, `updateCustomerByID`

See the full [API documentation](docs/modules.md) for every function's parameters.

## Upgrading from 0.2

Version 1.0 is server-side only.

- New: `createTWCClient`, which handles tokens and checks that wishlists and items belong to the shopper.
- `token` is required on every individual function. Shopify proxy authentication (`initTWC`, `resolveToken`, `invalidateToken`) has been removed: the proxy token cannot call these APIs.
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
