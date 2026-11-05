// Server-side SDK: every function takes an access token from the tenant's TWC server API client.
// Proxy auth (initTWC) and guest wishlists (getOrCreateAnonymous / mergeOnLogin) are not exported:
// the Shopify proxy token cannot call these APIs, and guest wishlists are not currently supported.

// Wishlist API
export * from "./wishlistService/getWishlist";
export * from "./wishlistService/getWishlistItemByID";
export * from "./wishlistService/getWishlistItemByRef";
export * from "./wishlistService/getWishlistItems";
export * from "./wishlistService/getWishlistsByCustomer";
export * from "./wishlistService/createWishlistItem";
export * from "./wishlistService/createWishlist";
export * from "./wishlistService/updateWishlist";
export * from "./wishlistService/updateWishlistItem";
export * from "./wishlistService/deleteWishlistItemByID";
export * from "./wishlistService/deleteWishlistItemByRef";
export * from "./wishlistService/deleteWishlist";
export * from "./wishlistService/getItemsPopularity";

// Customer API
export * from "./customerService/getCustomerByID";
export * from "./customerService/getCusotmerByRef";
export * from "./customerService/createCustomer";
export * from "./customerService/updateCustomerByID";
export * from "./customerService/updateCustomer";
