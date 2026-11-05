[@thewishlistco/twc](../README.md) / [Exports](../modules.md) / TWCClientOptions

# Interface: TWCClientOptions

## Table of contents

### Properties

- [clientId](TWCClientOptions.md#clientid)
- [clientSecret](TWCClientOptions.md#clientsecret)
- [fetch](TWCClientOptions.md#fetch)
- [tenant](TWCClientOptions.md#tenant)

## Properties

### clientId

• **clientId**: `string`

Your TWC server API client ID.

#### Defined in

[src/client/createTWCClient.ts:22](https://github.com/The-Wishlist-Co/JavascriptSDK/blob/8233049bee20730ed06269576b79975161402e0a/src/client/createTWCClient.ts#L22)

___

### clientSecret

• **clientSecret**: `string`

Your TWC server API client secret. Keep it in your server's secrets manager or environment.

#### Defined in

[src/client/createTWCClient.ts:24](https://github.com/The-Wishlist-Co/JavascriptSDK/blob/8233049bee20730ed06269576b79975161402e0a/src/client/createTWCClient.ts#L24)

___

### fetch

• `Optional` **fetch**: (`input`: `RequestInfo` \| `URL`, `init?`: `RequestInit`) => `Promise`\<`Response`\>

A fetch implementation. Defaults to the runtime's global fetch (Node 18+, worker runtimes).

#### Type declaration

▸ (`input`, `init?`): `Promise`\<`Response`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `input` | `RequestInfo` \| `URL` |
| `init?` | `RequestInit` |

##### Returns

`Promise`\<`Response`\>

#### Defined in

[src/client/createTWCClient.ts:26](https://github.com/The-Wishlist-Co/JavascriptSDK/blob/8233049bee20730ed06269576b79975161402e0a/src/client/createTWCClient.ts#L26)

___

### tenant

• **tenant**: `string`

Your TWC tenant.

#### Defined in

[src/client/createTWCClient.ts:20](https://github.com/The-Wishlist-Co/JavascriptSDK/blob/8233049bee20730ed06269576b79975161402e0a/src/client/createTWCClient.ts#L20)
