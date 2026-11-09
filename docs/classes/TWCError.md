[@thewishlistco/twc](../README.md) / [Exports](../modules.md) / TWCError

# Class: TWCError

The one error type the TWC client throws.

It carries the HTTP status, a short code and a message naming the operation. It never
carries the client secret, tokens, request or response bodies, or values from the URL
(an email can be part of a TWC path), so it is safe to log.

## Hierarchy

- `Error`

  ↳ **`TWCError`**

## Table of contents

### Constructors

- [constructor](TWCError.md#constructor)

### Properties

- [code](TWCError.md#code)
- [message](TWCError.md#message)
- [name](TWCError.md#name)
- [stack](TWCError.md#stack)
- [status](TWCError.md#status)

## Constructors

### constructor

• **new TWCError**(`message`, `status`, `code`): [`TWCError`](TWCError.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | `string` |
| `status` | `number` |
| `code` | `string` |

#### Returns

[`TWCError`](TWCError.md)

#### Overrides

Error.constructor

#### Defined in

[src/client/errors.ts:14](https://github.com/The-Wishlist-Co/JavascriptSDK/blob/8233049bee20730ed06269576b79975161402e0a/src/client/errors.ts#L14)

## Properties

### code

• `Readonly` **code**: `string`

One of: bad_request, unauthorized, forbidden, not_found, conflict, rate_limited, server_error, network_error, invalid_argument, customer_conflict, browser_not_supported, auth_failed.

#### Defined in

[src/client/errors.ts:12](https://github.com/The-Wishlist-Co/JavascriptSDK/blob/8233049bee20730ed06269576b79975161402e0a/src/client/errors.ts#L12)

___

### message

• **message**: `string`

#### Inherited from

Error.message

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1077

___

### name

• **name**: `string`

#### Inherited from

Error.name

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1076

___

### stack

• `Optional` **stack**: `string`

#### Inherited from

Error.stack

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1078

___

### status

• `Readonly` **status**: `number`

HTTP status from TWC, or 0 when no response was received.

#### Defined in

[src/client/errors.ts:10](https://github.com/The-Wishlist-Co/JavascriptSDK/blob/8233049bee20730ed06269576b79975161402e0a/src/client/errors.ts#L10)
