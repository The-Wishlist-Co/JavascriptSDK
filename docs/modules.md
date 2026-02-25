[@thewishlistco/twc](README.md) / Exports

# @thewishlistco/twc

## Table of contents

### Interfaces

- [TWCConfig](interfaces/TWCConfig.md)

### Functions

- [initTWC](modules.md#inittwc)
- [resolveToken](modules.md#resolvetoken)

### customerService

- [createBulkCustomers](modules.md#createbulkcustomers)
- [createCustomer](modules.md#createcustomer)
- [customerLookup](modules.md#customerlookup)
- [deleteCustomer](modules.md#deletecustomer)
- [deleteCustomerByID](modules.md#deletecustomerbyid)
- [getCustomerByID](modules.md#getcustomerbyid)
- [getCustomerByRef](modules.md#getcustomerbyref)
- [updateCustomer](modules.md#updatecustomer)
- [updateCustomerByID](modules.md#updatecustomerbyid)
- [updateCustomerByRef](modules.md#updatecustomerbyref)

### wishlistService

- [createWishlist](modules.md#createwishlist)
- [createWishlistItem](modules.md#createwishlistitem)
- [deleteAllWishlist](modules.md#deleteallwishlist)
- [deleteWishlist](modules.md#deletewishlist)
- [deleteWishlistByID](modules.md#deletewishlistbyid)
- [deleteWishlistByRef](modules.md#deletewishlistbyref)
- [deleteWishlistItemByID](modules.md#deletewishlistitembyid)
- [deleteWishlistItemByRef](modules.md#deletewishlistitembyref)
- [getCustomersWithFlag](modules.md#getcustomerswithflag)
- [getItemsPopularity](modules.md#getitemspopularity)
- [getWishlist](modules.md#getwishlist)
- [getWishlistByCustomer](modules.md#getwishlistbycustomer)
- [getWishlistByCustomerID](modules.md#getwishlistbycustomerid)
- [getWishlistByCustomerRef](modules.md#getwishlistbycustomerref)
- [getWishlistByID](modules.md#getwishlistbyid)
- [getWishlistByRef](modules.md#getwishlistbyref)
- [getWishlistItemByID](modules.md#getwishlistitembyid)
- [getWishlistItemByRef](modules.md#getwishlistitembyref)
- [getWishlistItems](modules.md#getwishlistitems)
- [resetWishlistItemFlag](modules.md#resetwishlistitemflag)
- [updateWishlist](modules.md#updatewishlist)
- [updateWishlistByID](modules.md#updatewishlistbyid)
- [updateWishlistByRef](modules.md#updatewishlistbyref)
- [updateWishlistItem](modules.md#updatewishlistitem)
- [updateWishlistItemByID](modules.md#updatewishlistitembyid)
- [updateWishlistItemByRef](modules.md#updatewishlistitembyref)

## Functions

### initTWC

▸ **initTWC**(`cfg`): `void`

Initializes the TWC SDK for Shopify proxy-based authentication.
Call this once (e.g. on page load) before using any SDK functions without a token.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `cfg` | [`TWCConfig`](interfaces/TWCConfig.md) | Configuration object. |

#### Returns

`void`

#### Defined in

config.ts:15

___

### resolveToken

▸ **resolveToken**(`token?`): `Promise`\<`string`\>

Resolves an authentication token for TWC API calls.

- If a token is provided directly, it is returned as-is (zero overhead).
- If no token is provided, fetches one from the Shopify App Proxy
  configured via [initTWC](modules.md#inittwc). The proxy token is cached client-side
  to avoid repeated network calls.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `token?` | `string` | An explicit bearer token. When supplied, proxy auth is bypassed. |

#### Returns

`Promise`\<`string`\>

A promise that resolves to a valid access token string.

**`Throws`**

If no token is provided and `initTWC` has not been called.

**`Throws`**

If the proxy request fails or returns an unsuccessful response.

#### Defined in

auth/proxyAuth.ts:21

## customerService

### createBulkCustomers

▸ **createBulkCustomers**(`obj`): `void`

Creates bulk customers.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `obj` | `Object` | The configuration object. |
| `obj.createBulkCustomerBody` | \{ `[key: string]`: `any`;  }[] | The body of the request containing the customer data. See https://the-wishlist-co.github.io/docs/customersvcApi.html#create-multiple-customers for information on the fields. |
| `obj.onError` | (`error`: `any`) => `void` | The callback function to be called on error. |
| `obj.onSuccess` | (`response`: `any`) => `void` | The callback function to be called on successful response. |
| `obj.tenant` | `string` | The tenant identifier. |
| `obj.token?` | `string` | The authentication token. If omitted, the SDK will use proxy auth (requires [initTWC](modules.md#inittwc)). |

#### Returns

`void`

#### Defined in

customerService/createBulkCustomers.ts:16

___

### createCustomer

▸ **createCustomer**(`obj`): `void`

Creates a new customer.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `obj` | `Object` | The configuration object. |
| `obj.createCustomerBody` | `Object` | The body of the request containing the customer data. See https://the-wishlist-co.github.io/docs/customersvcApi.html#create-a-customer for information on the fields. |
| `obj.onError` | (`error`: `any`) => `void` | The callback function to be called when an error occurs. |
| `obj.onSuccess` | (`response`: `any`) => `void` | The callback function to be called when the request is successful. |
| `obj.tenant` | `string` | The tenant identifier. |
| `obj.token?` | `string` | The authentication token. If omitted, the SDK will use proxy auth (requires [initTWC](modules.md#inittwc)). |

#### Returns

`void`

#### Defined in

customerService/createCustomer.ts:15

___

### customerLookup

▸ **customerLookup**(`obj`): `void`

Returns a list of customers with a matching email/mobile/phone/firstName/lastName.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `obj` | `Object` | The configuration object. |
| `obj.email?` | `string` | The email of the customer. |
| `obj.firstName?` | `string` | The first name of the customer. |
| `obj.lastName?` | `string` | The last name of the customer. |
| `obj.mobile?` | `string` | The mobile number of the customer. |
| `obj.onError` | (`error`: `any`) => `void` | The callback function to be called on lookup error. |
| `obj.onSuccess` | (`response`: `any`) => `void` | The callback function to be called on successful lookup. |
| `obj.phone?` | `string` | The phone number of the customer. |
| `obj.tenant` | `string` | The tenant identifier. |
| `obj.token?` | `string` | The authentication token. If omitted, the SDK will use proxy auth (requires [initTWC](modules.md#inittwc)). |

#### Returns

`void`

#### Defined in

customerService/customerLookup.ts:19

___

### deleteCustomer

▸ **deleteCustomer**(`obj`): `void`

Deletes a customer.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `obj` | `Object` | The configuration object. |
| `obj.customerID?` | `string` | The ID of the customer to delete (either customerID or customerRef must be defined). |
| `obj.customerRef?` | `string` | The reference of the customer to delete (either customerID or customerRef must be defined). |
| `obj.onError` | (`error`: `any`) => `void` | The callback function to be called on error. |
| `obj.onSuccess` | (`response`: `any`) => `void` | The callback function to be called on successful deletion. |
| `obj.tenant` | `string` | The tenant ID. |
| `obj.token?` | `string` | The authentication token. If omitted, the SDK will use proxy auth (requires [initTWC](modules.md#inittwc)). |

#### Returns

`void`

#### Defined in

customerService/deleteCustomer.ts:17

___

### deleteCustomerByID

▸ **deleteCustomerByID**(`obj`): `void`

Deletes a customer by their ID.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `obj` | `Object` | The configuration object. |
| `obj.customerID` | `string` | The ID of the customer to delete. |
| `obj.onError` | (`error`: `any`) => `void` | The callback function to be called when an error occurs during deletion. |
| `obj.onSuccess` | (`response`: `any`) => `void` | The callback function to be called when the deletion is successful. |
| `obj.tenant` | `string` | The tenant identifier. |
| `obj.token?` | `string` | The authentication token. If omitted, the SDK will use proxy auth (requires [initTWC](modules.md#inittwc)). |

#### Returns

`void`

#### Defined in

customerService/deleteCustomerByID.ts:16

___

### getCustomerByID

▸ **getCustomerByID**(`obj`): `void`

Retrieves customer information by ID.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `obj` | `Object` | The configuration object. |
| `obj.customerID` | `string` | The ID of the customer to retrieve. |
| `obj.onError` | (`error`: `any`) => `void` | The callback function to handle any errors. |
| `obj.onSuccess` | (`response`: `any`) => `void` | The callback function to handle the successful response. |
| `obj.tenant` | `string` | The tenant identifier. |
| `obj.token?` | `string` | The authentication token. If omitted, the SDK will use proxy auth (requires [initTWC](modules.md#inittwc)). |

#### Returns

`void`

#### Defined in

customerService/getCustomerByID.ts:15

___

### getCustomerByRef

▸ **getCustomerByRef**(`obj`): `void`

Retrieves customer information by customer reference.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `obj` | `Object` | The configuration object. |
| `obj.customerRef` | `string` | The customer reference. |
| `obj.onError` | (`error`: `any`) => `void` | The callback function to handle any errors. |
| `obj.onSuccess` | (`response`: `any`) => `void` | The callback function to handle the successful response. |
| `obj.tenant` | `string` | The tenant identifier. |
| `obj.token?` | `string` | The authentication token. If omitted, the SDK will use proxy auth (requires [initTWC](modules.md#inittwc)). |

#### Returns

`void`

#### Defined in

customerService/getCusotmerByRef.ts:15

___

### updateCustomer

▸ **updateCustomer**(`obj`): `void`

Updates a customer using the provided data.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `obj` | `Object` | The configuration object. |
| `obj.onError` | (`error`: `any`) => `void` | The callback function to be executed when an error occurs during the request. |
| `obj.onSuccess` | (`response`: `any`) => `void` | The callback function to be executed when the request is successful. |
| `obj.tenant` | `string` | The tenant identifier for the request. |
| `obj.token?` | `string` | The authentication token. If omitted, the SDK will use proxy auth (requires [initTWC](modules.md#inittwc)). |
| `obj.updateCustomerBody` | `Object` | The data to be sent in the request body for updating the customer. See https://the-wishlist-co.github.io/docs/customersvcApi.html#update for information on the fields. |

#### Returns

`void`

#### Defined in

customerService/updateCustomer.ts:17

___

### updateCustomerByID

▸ **updateCustomerByID**(`obj`): `void`

Updates a customer by their ID.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `obj` | `Object` | The configuration object. |
| `obj.customerID` | `string` | The ID of the customer to update. |
| `obj.onError` | (`error`: `any`) => `void` | The callback function to be called on error. |
| `obj.onSuccess` | (`response`: `any`) => `void` | The callback function to be called on successful update. |
| `obj.tenant` | `string` | The tenant ID. |
| `obj.token?` | `string` | The authentication token. If omitted, the SDK will use proxy auth (requires [initTWC](modules.md#inittwc)). |
| `obj.updateCustomerBody` | `Object` | The updated customer data. See https://the-wishlist-co.github.io/docs/customersvcApi.html#update for information on the fields. |

#### Returns

`void`

#### Defined in

customerService/updateCustomerByID.ts:17

___

### updateCustomerByRef

▸ **updateCustomerByRef**(`obj`): `void`

Updates a customer by reference.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `obj` | `Object` | The configuration object. |
| `obj.customerRef` | `string` | The reference of the customer to update. |
| `obj.onError` | (`error`: `any`) => `void` | The callback function to be called on error. |
| `obj.onSuccess` | (`response`: `any`) => `void` | The callback function to be called on successful update. |
| `obj.tenant` | `string` | The tenant identifier. |
| `obj.token?` | `string` | The authentication token. If omitted, the SDK will use proxy auth (requires [initTWC](modules.md#inittwc)). |
| `obj.updateCustomerBody` | `Object` | The updated customer data. See https://the-wishlist-co.github.io/docs/customersvcApi.html#update for information on the fields. |

#### Returns

`void`

#### Defined in

customerService/updateCustomerByRef.ts:17

## wishlistService

### createWishlist

▸ **createWishlist**(`obj`): `void`

Creates a new wishlist.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `obj` | `Object` | The configuration object. |
| `obj.newWishlistBody` | `Object` | The body of the new wishlist. See https://the-wishlist-co.github.io/docs/wishlistSvcAPI.html#ceate-a-wishlist for information on the fields. |
| `obj.onError` | (`error`: `any`) => `void` | The callback function to be called on error. |
| `obj.onSuccess` | (`response`: `any`) => `void` | The callback function to be called on successful creation. |
| `obj.tenant` | `string` | The tenant identifier. |
| `obj.token?` | `string` | The authentication token. If omitted, the SDK will use proxy auth (requires [initTWC](modules.md#inittwc)). |

#### Returns

`void`

#### Defined in

wishlistService/createWishlist.ts:15

___

### createWishlistItem

▸ **createWishlistItem**(`obj`): `void`

Creates a wishlist item.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `obj` | `Object` | The configuration object. |
| `obj.createWishlistItembody` | `Object` | The body of the wishlist item to be created. See https://the-wishlist-co.github.io/docs/wishlistSvcAPI.html#create-a-wishlist-item for information on the fields. |
| `obj.onError` | (`error`: `any`) => `void` | The callback function to be called on error during the creation of the wishlist item. |
| `obj.onSuccess` | (`response`: `any`) => `void` | The callback function to be called on successful creation of the wishlist item. |
| `obj.tenant` | `string` | The tenant identifier. |
| `obj.token?` | `string` | The authentication token. If omitted, the SDK will use proxy auth (requires [initTWC](modules.md#inittwc)). |

#### Returns

`void`

#### Defined in

wishlistService/createWishlistItem.ts:15

___

### deleteAllWishlist

▸ **deleteAllWishlist**(`obj`): `void`

Deletes all wishlists for a customer.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `obj` | `Object` | The configuration object. |
| `obj.customerID?` | `string` | The ID of the customer (either customerID or customerRef must be defined). |
| `obj.customerRef?` | `string` | The reference of the customer (either customerID or customerRef must be defined). |
| `obj.onError` | (`error`: `any`) => `void` | The callback function to be called on error. |
| `obj.onSuccess` | (`response`: `any`) => `void` | The callback function to be called on successful deletion. |
| `obj.tenant` | `string` | The tenant identifier. |
| `obj.token?` | `string` | The authentication token. If omitted, the SDK will use proxy auth (requires [initTWC](modules.md#inittwc)). |

#### Returns

`void`

#### Defined in

wishlistService/deleteAllWishlist.ts:16

___

### deleteWishlist

▸ **deleteWishlist**(`obj`): `void`

Deletes a wishlist by either ID or Ref.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `obj` | `Object` | The configuration object. |
| `obj.onError` | (`error`: `any`) => `void` | The callback function to be called when an error occurs during deletion. |
| `obj.onSuccess` | (`response`: `any`) => `void` | The callback function to be called when the deletion is successful. |
| `obj.tenant` | `string` | The tenant identifier. |
| `obj.token?` | `string` | The authentication token. If omitted, the SDK will use proxy auth (requires [initTWC](modules.md#inittwc)). |
| `obj.wishlistID?` | `string` | The ID of the wishlist to delete (either wishlistID or wishlistRef must be defined). |
| `obj.wishlistRef?` | `string` | The reference of the wishlist to delete (either wishlistID or wishlistRef must be defined). |

#### Returns

`void`

#### Defined in

wishlistService/deleteWishlist.ts:17

___

### deleteWishlistByID

▸ **deleteWishlistByID**(`obj`): `void`

Deletes a wishlist by ID.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `obj` | `Object` | The configuration object. |
| `obj.onError` | (`error`: `any`) => `void` | The callback function to be called when an error occurs during deletion. |
| `obj.onSuccess` | (`response`: `any`) => `void` | The callback function to be called when the deletion is successful. |
| `obj.tenant` | `string` | The tenant identifier. |
| `obj.token?` | `string` | The authentication token. If omitted, the SDK will use proxy auth (requires [initTWC](modules.md#inittwc)). |
| `obj.wishlistID` | `string` | The ID of the wishlist to delete. |

#### Returns

`void`

#### Defined in

wishlistService/deleteWishlistByID.ts:15

___

### deleteWishlistByRef

▸ **deleteWishlistByRef**(`obj`): `void`

Deletes a wishlist by its reference.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `obj` | `Object` | The configuration object. |
| `obj.onError` | (`error`: `any`) => `void` | The callback function to be called when an error occurs during the deletion. |
| `obj.onSuccess` | (`response`: `any`) => `void` | The callback function to be called when the wishlist is successfully deleted. |
| `obj.tenant` | `string` | The tenant identifier. |
| `obj.token?` | `string` | The authentication token. If omitted, the SDK will use proxy auth (requires [initTWC](modules.md#inittwc)). |
| `obj.wishlistRef` | `string` | The reference of the wishlist to delete. |

#### Returns

`void`

#### Defined in

wishlistService/deleteWishlistByRef.ts:16

___

### deleteWishlistItemByID

▸ **deleteWishlistItemByID**(`obj`): `void`

Deletes a wishlist item by ID.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `obj` | `Object` | The configuration object. |
| `obj.onError` | (`error`: `any`) => `void` | The callback function to be called on error. |
| `obj.onSuccess` | (`response`: `any`) => `void` | The callback function to be called on successful deletion. |
| `obj.tenant` | `string` | The tenant. |
| `obj.token?` | `string` | The authentication token. If omitted, the SDK will use proxy auth (requires [initTWC](modules.md#inittwc)). |
| `obj.wishlistItemID` | `string` | The ID of the wishlist item to delete. |

#### Returns

`void`

#### Defined in

wishlistService/deleteWishlistItemByID.ts:16

___

### deleteWishlistItemByRef

▸ **deleteWishlistItemByRef**(`obj`): `void`

Deletes a wishlist item by its reference.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `obj` | `Object` | The configuration object. |
| `obj.onError` | (`error`: `any`) => `void` | The callback function to be called on error. |
| `obj.onSuccess` | (`response`: `any`) => `void` | The callback function to be called on successful deletion. |
| `obj.tenant` | `string` | The tenant identifier. |
| `obj.token?` | `string` | The authentication token. If omitted, the SDK will use proxy auth (requires [initTWC](modules.md#inittwc)). |
| `obj.wishlistItemRef` | `string` | The reference of the wishlist item to delete. |

#### Returns

`void`

#### Defined in

wishlistService/deleteWishlistItemByRef.ts:15

___

### getCustomersWithFlag

▸ **getCustomersWithFlag**(`obj`): `void`

Retrieves the wishlist customers which are enabled for notifyMe or preRelease.
If the customers do not exist, this method returns an empty list.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `obj` | `Object` | The configuration object. |
| `obj.notifyMe?` | `boolean` | A boolean indicating whether to retrieve customers with notifyMe enabled (either notifyMe or preRelease must be defined). |
| `obj.onError` | (`error`: `any`) => `void` | The callback function to be called if an error occurs during retrieval. |
| `obj.onSuccess` | (`response`: `any`) => `void` | The callback function to be called on successful retrieval of customers. |
| `obj.preRelease?` | `boolean` | A boolean indicating whether to retrieve customers with preRelease enabled (either notifyMe or preRelease must be defined). |
| `obj.productRef?` | `string` | The product reference to filter the customers by (either productRef or variantRef must be defined). |
| `obj.tenant` | `string` | The tenant identifier. |
| `obj.token?` | `string` | The authentication token. If omitted, the SDK will use proxy auth (requires [initTWC](modules.md#inittwc)). |
| `obj.variantRef?` | `string` | The variant reference to filter the customers by (either productRef or variantRef must be defined). |

#### Returns

`void`

#### Defined in

wishlistService/getCustomersWithFlag.ts:24

___

### getItemsPopularity

▸ **getItemsPopularity**(`obj`): `void`

Show a count of the number of times an item has been wishlisted.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `obj` | `Object` | The configuration object. |
| `obj.itemsPopularityBody` | `Object` | The array of product or variant refs to get statistic. See https://the-wishlist-co.github.io/docs/wishlistSvcAPI.html#update-a-wishlist-item-by-wishlist-item-id for information on the fields. |
| `obj.onError` | (`error`: `any`) => `void` | The callback function to be called when an error occurs during the update. |
| `obj.onSuccess` | (`response`: `any`) => `void` | The callback function to be called when the update is successful. |
| `obj.tenant` | `string` | The tenant identifier. |
| `obj.token?` | `string` | The authentication token. If omitted, the SDK will use proxy auth (requires [initTWC](modules.md#inittwc)). |

#### Returns

`void`

#### Defined in

wishlistService/getItemsPopularity.ts:18

___

### getWishlist

▸ **getWishlist**(`obj`): `void`

Retrieves the wishlist data based on the provided parameters.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `obj` | `Object` | The configuration object. |
| `obj.lastItemId?` | `string` | The ID of the last item retrieved. |
| `obj.onError` | (`error`: `any`) => `void` | The callback function to handle any errors. |
| `obj.onSuccess` | (`response`: `any`) => `void` | The callback function to handle the successful response. |
| `obj.pageSize?` | `string` | The number of items per page to retrieve. |
| `obj.tenant` | `string` | The tenant identifier. |
| `obj.token?` | `string` | The authentication token. If omitted, the SDK will use proxy auth (requires [initTWC](modules.md#inittwc)). |
| `obj.wishlistID?` | `string` | The ID of the wishlist to retrieve (either wishlistID or wishlistRef must be defined). |
| `obj.wishlistRef?` | `string` | The reference of the wishlist to retrieve (either wishlistID or wishlistRef must be defined). |

#### Returns

`void`

#### Defined in

wishlistService/getWishlist.ts:22

___

### getWishlistByCustomer

▸ **getWishlistByCustomer**(`obj`): `void`

Retrieves the wishlist for a customer.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `obj` | `Object` | The configuration object. |
| `obj.customerID?` | `string` | The ID of the customer (either customerID or customerRef must be defined). |
| `obj.customerRef?` | `string` | The reference of the customer (either customerID or customerRef must be defined). |
| `obj.lastItemId?` | `string` | The ID of the last item retrieved. |
| `obj.onError` | (`error`: `any`) => `void` | The callback function to handle an error response. |
| `obj.onSuccess` | (`response`: `any`) => `void` | The callback function to handle a successful response. |
| `obj.pageSize?` | `string` | The number of items to retrieve per page. |
| `obj.tenant` | `string` | The tenant identifier. |
| `obj.token?` | `string` | The authentication token. If omitted, the SDK will use proxy auth (requires [initTWC](modules.md#inittwc)). |

#### Returns

`void`

#### Defined in

wishlistService/getWishlistByCustomer.ts:20

___

### getWishlistByCustomerID

▸ **getWishlistByCustomerID**(`obj`): `void`

Retrieves the wishlist for a specific customer ID.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `obj` | `Object` | The configuration object. |
| `obj.customerID` | `any` | The ID of the customer. |
| `obj.lastItemId?` | `string` | The ID of the last item retrieved. |
| `obj.onError` | (`error`: `any`) => `void` | The callback function to handle any errors. |
| `obj.onSuccess` | (`response`: `any`) => `void` | The callback function to handle the successful response. |
| `obj.pageSize?` | `number` | The number of items to retrieve per page (default: 10). |
| `obj.tenant` | `string` | The tenant ID. |
| `obj.token?` | `string` | The authentication token. If omitted, the SDK will use proxy auth (requires [initTWC](modules.md#inittwc)). |

#### Returns

`void`

#### Defined in

wishlistService/getWishlistByCustomerID.ts:17

___

### getWishlistByCustomerRef

▸ **getWishlistByCustomerRef**(`obj`): `void`

Retrieves the wishlist for a customer based on the customer reference.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `obj` | `Object` | The configuration object. |
| `obj.customerRef` | `string` | The customer reference. |
| `obj.lastItemId?` | `string` | The ID of the last item retrieved. |
| `obj.onError` | (`error`: `any`) => `void` | The callback function to handle an error response. |
| `obj.onSuccess` | (`response`: `any`) => `void` | The callback function to handle a successful response. |
| `obj.pageSize?` | `number` | The number of items to retrieve per page (default: 10). |
| `obj.tenant` | `string` | The tenant identifier. |
| `obj.token?` | `string` | The authentication token. If omitted, the SDK will use proxy auth (requires [initTWC](modules.md#inittwc)). |

#### Returns

`void`

#### Defined in

wishlistService/getWishlistByCustomerRef.ts:17

___

### getWishlistByID

▸ **getWishlistByID**(`obj`): `void`

Retrieves a wishlist by its ID.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `obj` | `Object` | The configuration object. |
| `obj.lastItemId?` | `string` | The ID of the last item. |
| `obj.onError` | (`error`: `any`) => `void` | The callback function to handle the error response. |
| `obj.onSuccess` | (`response`: `any`) => `void` | The callback function to handle the successful response. |
| `obj.pageSize?` | `number` | The number of items per page. |
| `obj.tenant` | `string` | The tenant. |
| `obj.token?` | `string` | The authentication token. If omitted, the SDK will use proxy auth (requires [initTWC](modules.md#inittwc)). |
| `obj.wishlistID` | `string` | The ID of the wishlist. |

#### Returns

`void`

#### Defined in

wishlistService/getWishlistByID.ts:17

___

### getWishlistByRef

▸ **getWishlistByRef**(`obj`): `void`

Retrieves a wishlist by its reference.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `obj` | `Object` | The configuration object. |
| `obj.onError` | (`error`: `any`) => `void` | The callback function to be called when an error occurs during the retrieval. |
| `obj.onSuccess` | (`response`: `any`) => `void` | The callback function to be called when the wishlist is successfully retrieved. |
| `obj.tenant` | `string` | The tenant identifier. |
| `obj.token?` | `string` | The authentication token. If omitted, the SDK will use proxy auth (requires [initTWC](modules.md#inittwc)). |
| `obj.wishlistRef` | `string` | The reference of the wishlist to retrieve. |

#### Returns

`void`

#### Defined in

wishlistService/getWishlistByRef.ts:15

___

### getWishlistItemByID

▸ **getWishlistItemByID**(`obj`): `void`

Retrieves a wishlist item by its ID.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `obj` | `Object` | The configuration object. |
| `obj.onError` | (`error`: `any`) => `void` | The callback function to be called when an error occurs. |
| `obj.onSuccess` | (`response`: `any`) => `void` | The callback function to be called when the request is successful. |
| `obj.tenant` | `string` | The tenant identifier. |
| `obj.token?` | `string` | The authentication token. If omitted, the SDK will use proxy auth (requires [initTWC](modules.md#inittwc)). |
| `obj.wishlistItemID` | `string` | The ID of the wishlist item to retrieve. |

#### Returns

`void`

#### Defined in

wishlistService/getWishlistItemByID.ts:17

___

### getWishlistItemByRef

▸ **getWishlistItemByRef**(`obj`): `void`

Retrieves a wishlist item by its reference.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `obj` | `Object` | The configuration object. |
| `obj.onError` | (`error`: `any`) => `void` | The callback function to be called when an error occurs. |
| `obj.onSuccess` | (`response`: `any`) => `void` | The callback function to be called when the request is successful. |
| `obj.tenant` | `string` | The tenant identifier. |
| `obj.token?` | `string` | The authentication token. If omitted, the SDK will use proxy auth (requires [initTWC](modules.md#inittwc)). |
| `obj.wishlistItemRef` | `string` | The reference of the wishlist item to retrieve. |

#### Returns

`void`

#### Defined in

wishlistService/getWishlistItemByRef.ts:16

___

### getWishlistItems

▸ **getWishlistItems**(`obj`): `void`

Retrieves wishlist items based on the provided parameters.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `obj` | `Object` | The configuration object. |
| `obj.lastItemId?` | `string` | The ID of the last item retrieved. |
| `obj.onError` | (`error`: `any`) => `void` | The callback function to handle error response. |
| `obj.onSuccess` | (`response`: `any`) => `void` | The callback function to handle successful response. |
| `obj.pageSize?` | `string` | The number of items to retrieve per page. |
| `obj.tenant` | `string` | The tenant information. |
| `obj.token?` | `string` | The authentication token. If omitted, the SDK will use proxy auth (requires [initTWC](modules.md#inittwc)). |
| `obj.wishlistID` | `string` | The ID of the wishlist (either wishlistID or wishlistRef must be defined). |
| `obj.wishlistRef` | `string` | The reference of the wishlist (either wishlistID or wishlistRef must be defined). |

#### Returns

`void`

#### Defined in

wishlistService/getWishlistItems.ts:21

___

### resetWishlistItemFlag

▸ **resetWishlistItemFlag**(`obj`): `void`

Resets the wishlist item flag.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `obj` | `Object` | The configuration object. |
| `obj.notifyMe?` | `boolean` | Indicates whether to notify the user (either notifyMe or preRelease must be defined). |
| `obj.onError` | (`error`: `any`) => `void` | The callback function to be called on error. |
| `obj.onSuccess` | (`response`: `any`) => `void` | The callback function to be called on success. |
| `obj.preRelease?` | `boolean` | Indicates whether the item is a pre-release (either notifyMe or preRelease must be defined). |
| `obj.productRef?` | `string` | The product reference (either productRef or variantRef must be defined). |
| `obj.tenant` | `string` | The tenant identifier. |
| `obj.token?` | `string` | The authentication token. If omitted, the SDK will use proxy auth (requires [initTWC](modules.md#inittwc)). |
| `obj.variantRef?` | `string` | The variant reference (either productRef or variantRef must be defined). |

#### Returns

`void`

#### Defined in

wishlistService/resetWishlistItemFlag.ts:22

___

### updateWishlist

▸ **updateWishlist**(`obj`): `void`

Updates a wishlist.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `obj` | `Object` | The configuration object. |
| `obj.onError` | (`error`: `any`) => `void` | The callback function to be called on error. |
| `obj.onSuccess` | (`response`: `any`) => `void` | The callback function to be called on successful update. |
| `obj.tenant` | `string` | The tenant identifier. |
| `obj.token?` | `string` | The authentication token. If omitted, the SDK will use proxy auth (requires [initTWC](modules.md#inittwc)). |
| `obj.updateWishlistBody` | `Object` | The body of the wishlist update request. See https://the-wishlist-co.github.io/docs/wishlistSvcAPI.html#update-wishlist-by-either-id-or-ref for information on the fields. |

#### Returns

`void`

#### Defined in

wishlistService/updateWishlist.ts:17

___

### updateWishlistByID

▸ **updateWishlistByID**(`obj`): `void`

Updates a wishlist by its ID.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `obj` | `Object` | The configuration object. |
| `obj.onError` | (`error`: `any`) => `void` | The callback function to be called on error. |
| `obj.onSuccess` | (`response`: `any`) => `void` | The callback function to be called on successful update. |
| `obj.tenant` | `string` | The tenant identifier. |
| `obj.token?` | `string` | The authentication token. If omitted, the SDK will use proxy auth (requires [initTWC](modules.md#inittwc)). |
| `obj.updateWishlistByIDBody` | `Object` | The updated wishlist data. See https://the-wishlist-co.github.io/docs/wishlistSvcAPI.html#get-wishlist-by-id-or-wishlistref for information on the fields. |
| `obj.wishlistID` | `string` | The ID of the wishlist to update. |

#### Returns

`void`

#### Defined in

wishlistService/updateWishlistByID.ts:16

___

### updateWishlistByRef

▸ **updateWishlistByRef**(`obj`): `void`

Updates a wishlist by its reference.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `obj` | `Object` | The configuration object. |
| `obj.onError` | (`error`: `any`) => `void` | The callback function to be called on error. |
| `obj.onSuccess` | (`response`: `any`) => `void` | The callback function to be called on successful update. |
| `obj.tenant` | `string` | The tenant identifier. |
| `obj.token?` | `string` | The authentication token. If omitted, the SDK will use proxy auth (requires [initTWC](modules.md#inittwc)). |
| `obj.updateWishlistByIDBody` | `Object` | The updated wishlist data. See https://the-wishlist-co.github.io/docs/wishlistSvcAPI.html#get-wishlist-by-id-or-wishlistref for information on the fields. |
| `obj.wishlistRef` | `string` | The reference of the wishlist to update. |

#### Returns

`void`

#### Defined in

wishlistService/updateWishlistByRef.ts:16

___

### updateWishlistItem

▸ **updateWishlistItem**(`obj`): `void`

Updates a wishlist item.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `obj` | `Object` | The configuration object. |
| `obj.onError` | (`error`: `any`) => `void` | The callback function to be called when an error occurs during the update. |
| `obj.onSuccess` | (`response`: `any`) => `void` | The callback function to be called when the update is successful. |
| `obj.tenant` | `string` | The tenant identifier. |
| `obj.token?` | `string` | The authentication token. If omitted, the SDK will use proxy auth (requires [initTWC](modules.md#inittwc)). |
| `obj.updateWishlistItemBody` | `Object` | The body of the request containing the updated wishlist item data. See https://the-wishlist-co.github.io/docs/wishlistSvcAPI.html#update-a-wishlist-item-by-wishlist-item-id for information on the fields. |

#### Returns

`void`

#### Defined in

wishlistService/updateWishlistItem.ts:18

___

### updateWishlistItemByID

▸ **updateWishlistItemByID**(`obj`): `void`

Updates a wishlist item by its ID.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `obj` | `Object` | The configuration object. |
| `obj.onError` | (`error`: `any`) => `void` | The callback function to be called on error. |
| `obj.onSuccess` | (`response`: `any`) => `void` | The callback function to be called on successful update. |
| `obj.tenant` | `string` | The tenant identifier. |
| `obj.token?` | `string` | The authentication token. If omitted, the SDK will use proxy auth (requires [initTWC](modules.md#inittwc)). |
| `obj.updateWishlistItemBody` | `Object` | The updated wishlist item data. See https://the-wishlist-co.github.io/docs/wishlistSvcAPI.html#update-a-wishlist-item-by-wishlist-item-id for information on the fields. |
| `obj.wishlistItemID` | `string` | The ID of the wishlist item to update. |

#### Returns

`void`

#### Defined in

wishlistService/updateWishlistItemByID.ts:17

___

### updateWishlistItemByRef

▸ **updateWishlistItemByRef**(`obj`): `void`

Updates a wishlist item by its reference.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `obj` | `Object` | The configuration object. |
| `obj.onError` | (`error`: `any`) => `void` | The callback function to be called on error. |
| `obj.onSuccess` | (`response`: `any`) => `void` | The callback function to be called on successful update. |
| `obj.tenant` | `string` | The tenant identifier. |
| `obj.token?` | `string` | The authentication token. If omitted, the SDK will use proxy auth (requires [initTWC](modules.md#inittwc)). |
| `obj.updateWishlistItemBody` | `Object` | The updated wishlist item data. See https://the-wishlist-co.github.io/docs/wishlistSvcAPI.html#update-a-wishlist-item-by-wishlist-item-id for information on the fields. |
| `obj.wishlistItemRef` | `string` | The reference of the wishlist item to update. |

#### Returns

`void`

#### Defined in

wishlistService/updateWishlistItemByRef.ts:17
