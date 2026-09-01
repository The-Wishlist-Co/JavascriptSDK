[@thewishlistco/twc](../README.md) / [Exports](../modules.md) / TWCConfig

# Interface: TWCConfig

## Table of contents

### Properties

- [anonymousWishlistEnabled](TWCConfig.md#anonymouswishlistenabled)
- [shopDomain](TWCConfig.md#shopdomain)

## Properties

### anonymousWishlistEnabled

• `Optional` **anonymousWishlistEnabled**: `boolean`

Tenant feature flag for guest (anonymous) wishlists. When `false`,
[getOrCreateAnonymous](../modules.md#getorcreateanonymous) and [mergeOnLogin](../modules.md#mergeonlogin) are silent no-ops.
Defaults to `true`.

#### Defined in

config.ts:8

___

### shopDomain

• **shopDomain**: `string`

#### Defined in

config.ts:2
