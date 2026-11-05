// Tests for createTWCClient against the built package, with a mocked fetch. Run: npm test
import { test } from "node:test";
import assert from "node:assert/strict";
import { createTWCClient, TWCError } from "../dist/index.mjs";

const SECRET = "s3cret-value";
const CUSTOMER = { customerRef: "7001", email: "shopper@example.com" };
const OTHER_WISHLIST = "wl-other";

function json(status, body) {
  if (status === 204) return new Response(null, { status });
  return new Response(body === undefined ? "" : JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

/** A fake TWC: routes by method + path, records every call. Tokens are tok-1, tok-2, ... */
function fakeTwc({ tokenTtl = 300, customer = { id: "c-1", customerRef: "7001", email: CUSTOMER.email }, routes = {} } = {}) {
  const calls = [];
  let tokenCount = 0;
  const fetch = async (url, init = {}) => {
    const u = new URL(url);
    const method = init.method || "GET";
    calls.push({ method, url: u, headers: init.headers || {}, body: init.body });
    if (u.pathname.endsWith("/protocol/openid-connect/token")) {
      tokenCount += 1;
      return json(200, { access_token: `tok-${tokenCount}`, expires_in: tokenTtl });
    }
    const key = `${method} ${u.pathname.replace("/services", "")}`;
    if (routes[key]) return routes[key](u, init, calls);
    if (key === "GET /customerservice/api/v2/customers/7001/ref") return customer ? json(200, customer) : json(404, {});
    if (key === "GET /wsservice/api/wishlists/byCustomer") {
      return json(200, { totalItemsAllWishlists: 2, wishlists: [{ id: "wl-1", name: "Mine", itemCount: 2 }] });
    }
    return json(404, {});
  };
  return { fetch, calls };
}

const client = (fake, tenant = "tenant-a") => createTWCClient({ tenant, clientId: "srv", clientSecret: SECRET, fetch: fake.fetch });
const apiCalls = (calls) => calls.filter((c) => !c.url.pathname.endsWith("/token"));

test("refuses to run in a browser", () => {
  globalThis.document = {};
  try {
    assert.throws(() => createTWCClient({ tenant: "t", clientId: "a", clientSecret: "b" }), (e) => e instanceof TWCError && e.code === "browser_not_supported");
  } finally {
    delete globalThis.document;
  }
});

test("gets its token from Keycloak with client credentials, never from the Shopify proxy", async () => {
  const fake = fakeTwc();
  await client(fake).getWishlists(CUSTOMER);
  const tokenCall = fake.calls.find((c) => c.url.pathname.endsWith("/token"));
  assert.equal(tokenCall.url.href, "https://auth.au-aws.thewishlist.io/auth/realms/tenant-a/protocol/openid-connect/token");
  assert.match(tokenCall.body, /grant_type=client_credentials/);
  assert.ok(fake.calls.every((c) => !c.url.pathname.includes("/apps/")));
  for (const c of apiCalls(fake.calls)) {
    assert.equal(c.headers.Authorization, "Bearer tok-1");
    assert.equal(c.headers["X-TWC-Tenant"], "tenant-a");
  }
});

test("caches the token, shares one request between concurrent calls, refreshes near expiry", async () => {
  const fake = fakeTwc();
  const c = client(fake);
  await Promise.all([c.getWishlists(CUSTOMER), c.getWishlists(CUSTOMER), c.getWishlists(CUSTOMER)]);
  assert.equal(fake.calls.filter((x) => x.url.pathname.endsWith("/token")).length, 1);

  const shortLived = fakeTwc({ tokenTtl: 10 }); // inside the 30s refresh window
  const s = client(shortLived);
  await s.getWishlists(CUSTOMER);
  await s.getWishlists(CUSTOMER);
  // every API call finds the token inside the refresh window, so each one gets a fresh token
  const tokenRequests = shortLived.calls.filter((x) => x.url.pathname.endsWith("/token")).length;
  assert.equal(tokenRequests, apiCalls(shortLived.calls).length);
  assert.ok(tokenRequests > 1);
});

test("on a 401 gets a new token and retries once", async () => {
  let first = true;
  const fake = fakeTwc({
    routes: {
      "GET /wsservice/api/wishlists/byCustomer": () => {
        if (first) { first = false; return json(401, {}); }
        return json(200, { totalItemsAllWishlists: 0, wishlists: [] });
      },
    },
  });
  const result = await client(fake).getWishlists(CUSTOMER);
  assert.equal(result.totalItemsAllWishlists, 0);
  const byCustomer = fake.calls.filter((c) => c.url.pathname.endsWith("/byCustomer"));
  assert.deepEqual(byCustomer.map((c) => c.headers.Authorization), ["Bearer tok-1", "Bearer tok-2"]);
});

test("clients for different tenants never share a token", async () => {
  const fake = fakeTwc();
  await client(fake, "tenant-a").getWishlists(CUSTOMER);
  await client(fake, "tenant-b").getWishlists(CUSTOMER);
  const realms = fake.calls.filter((c) => c.url.pathname.endsWith("/token")).map((c) => c.url.pathname.split("/")[3]);
  assert.deepEqual(realms, ["tenant-a", "tenant-b"]);
  const byTenant = apiCalls(fake.calls).map((c) => `${c.headers["X-TWC-Tenant"]} ${c.headers.Authorization}`);
  assert.ok(byTenant.every((x) => x === "tenant-a Bearer tok-1" || x === "tenant-b Bearer tok-2"));
});

test("reads wishlists by the customer's TWC id from the session's Shopify customer ID", async () => {
  const fake = fakeTwc();
  const result = await client(fake).getWishlists(CUSTOMER);
  assert.equal(result.wishlists[0].id, "wl-1");
  const byCustomer = fake.calls.find((c) => c.url.pathname.endsWith("/byCustomer"));
  assert.equal(byCustomer.url.searchParams.get("customerId"), "c-1");
});

test("a customer with no TWC record has no wishlists, and nothing is created on read", async () => {
  const fake = fakeTwc({ customer: null });
  const result = await client(fake).getWishlists(CUSTOMER);
  assert.deepEqual(result, { totalItemsAllWishlists: 0, wishlists: [] });
  assert.ok(apiCalls(fake.calls).every((c) => c.method === "GET"));
});

test("writes to another customer's wishlist are refused without calling the endpoint", async () => {
  const fake = fakeTwc();
  const c = client(fake);
  for (const op of [
    () => c.renameWishlist(CUSTOMER, OTHER_WISHLIST, "x"),
    () => c.deleteWishlist(CUSTOMER, OTHER_WISHLIST),
    () => c.addItem(CUSTOMER, OTHER_WISHLIST, { productRef: "p", variantRef: "v" }),
    () => c.getWishlistItems(CUSTOMER, OTHER_WISHLIST),
  ]) {
    await assert.rejects(op, (e) => e instanceof TWCError && e.code === "not_found");
  }
  assert.ok(apiCalls(fake.calls).every((x) => x.method === "GET" && !x.url.pathname.endsWith("/wishlist/items")));
});

test("item operations check the item's wishlist belongs to the customer", async () => {
  const fake = fakeTwc({
    routes: {
      "GET /wsservice/api/wishlist/items/item-mine": () => json(200, { id: "item-mine", wishlistId: "wl-1", product: { productRef: "p1", selectedVariantRef: "v1" } }),
      "GET /wsservice/api/wishlist/items/item-other": () => json(200, { id: "item-other", wishlistId: OTHER_WISHLIST, product: {} }),
      "DELETE /wsservice/api/wishlist/items/item-mine": () => json(204),
      "PUT /wsservice/api/wishlist/items": (u, init) => json(200, JSON.parse(init.body)),
    },
  });
  const c = client(fake);
  await assert.rejects(() => c.removeItem(CUSTOMER, "item-other"), (e) => e.code === "not_found");
  await assert.rejects(() => c.changeItemVariant(CUSTOMER, "item-other", "v2"), (e) => e.code === "not_found");
  assert.ok(apiCalls(fake.calls).every((x) => x.method === "GET"));

  await c.removeItem(CUSTOMER, "item-mine");
  const updated = await c.changeItemVariant(CUSTOMER, "item-mine", "v2");
  assert.deepEqual(updated.product, { productRef: "p1", selectedVariantId: "", selectedVariantRef: "v2", oldVariantRef: "v1" });
  assert.equal(updated.wishlistId, "wl-1");
});

test("the shared wishlist read returns no customer fields", async () => {
  const fake = fakeTwc({
    routes: {
      "GET /wsservice/api/wishlists": () => json(200, { id: "wl-9", name: "Birthday", customerId: "c-9", customerRef: "9009", wishlistItems: [] }),
      "GET /wsservice/api/wishlist/items": () => json(200, {
        wishlistItems: [{ id: "i1", wishlistId: "wl-9", staffRef: "s1", locationRef: "l1", product: { productRef: "p1", selectedVariantRef: "v1" } }],
        lastEvaluatedItemId: "i1",
      }),
    },
  });
  const shared = await client(fake).getSharedWishlist("wl-9");
  assert.deepEqual(shared, { name: "Birthday", items: [{ productRef: "p1", variantRef: "v1" }], lastItemId: "i1" });
});

test("a private shared wishlist is not found", async () => {
  const fake = fakeTwc({ routes: { "GET /wsservice/api/wishlists": () => json(200, { id: "wl-9", name: "x", isPrivate: true }) } });
  await assert.rejects(() => client(fake).getSharedWishlist("wl-9"), (e) => e.code === "not_found");
});

test("ensureCustomer links the Shopify login to an email-only record, sending its fields back", async () => {
  let put;
  const fake = fakeTwc({
    customer: null,
    routes: {
      "GET /customerservice/api/v2/customers/shopper%40example.com/email": () =>
        json(200, { id: "c-5", email: CUSTOMER.email, firstName: "Sam", optin_preferences: { email: { opt_in_active: true } }, totalSpend: 10 }),
      "PUT /customerservice/api/v2/customers": (u, init) => { put = { u, body: JSON.parse(init.body) }; return json(200, { id: "c-5", customerRef: "7001" }); },
    },
  });
  await client(fake).ensureCustomer(CUSTOMER);
  assert.equal(put.u.searchParams.get("customerRef"), "7001");
  assert.deepEqual(put.body, { id: "c-5", email: CUSTOMER.email, firstName: "Sam", optin_preferences: { email: { opt_in_active: true } } });
});

test("ensureCustomer refuses an email record linked to another Shopify customer, without writing", async () => {
  const fake = fakeTwc({
    customer: null,
    routes: { "GET /customerservice/api/v2/customers/shopper%40example.com/email": () => json(200, { id: "c-6", customerRef: "8888" }) },
  });
  await assert.rejects(() => client(fake).ensureCustomer(CUSTOMER), (e) => e.code === "customer_conflict");
  assert.ok(apiCalls(fake.calls).every((c) => c.method === "GET"));
});

test("errors never contain the secret, tokens or values from the path", async () => {
  const fake = fakeTwc({ routes: { "GET /wsservice/api/wishlist/items/customerInterest/shopper%40example.com": () => json(500, { detail: "boom" }) } });
  const err = await client(fake).getInterests(CUSTOMER).catch((e) => e);
  assert.ok(err instanceof TWCError);
  assert.equal(err.status, 500);
  const text = `${err.message} ${JSON.stringify(err)} ${err.stack}`;
  for (const secret of [SECRET, "tok-1", CUSTOMER.email, "boom"]) assert.ok(!text.includes(secret), `error leaked ${secret}`);
});

test("registerInterest sends the widget's payload shape", async () => {
  let body;
  const fake = fakeTwc({ routes: { "POST /wsservice/api/wishlist/items/customerInterest": (u, init) => { body = JSON.parse(init.body); return json(200, {}); } } });
  await client(fake).registerInterest({ email: "a@b.co", variantRef: "v1", kind: "comingSoon", subscribe: true });
  assert.deepEqual(body, { email: "a@b.co", variantRef: "v1", subscribe: true, comingSoon: true });
});
