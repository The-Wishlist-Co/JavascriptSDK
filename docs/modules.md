[@thewishlistco/twc](README.md) / Exports

# @thewishlistco/twc

## Table of contents

### customerService

- [createCustomer](modules.md#createcustomer)
- [getCustomerByID](modules.md#getcustomerbyid)
- [getCustomerByRef](modules.md#getcustomerbyref)
- [updateCustomer](modules.md#updatecustomer)
- [updateCustomerByID](modules.md#updatecustomerbyid)

### wishlistService

- [createWishlist](modules.md#createwishlist)
- [createWishlistItem](modules.md#createwishlistitem)
- [deleteWishlist](modules.md#deletewishlist)
- [deleteWishlistItemByID](modules.md#deletewishlistitembyid)
- [deleteWishlistItemByRef](modules.md#deletewishlistitembyref)
- [getItemsPopularity](modules.md#getitemspopularity)
- [getWishlist](modules.md#getwishlist)
- [getWishlistItemByID](modules.md#getwishlistitembyid)
- [getWishlistItemByRef](modules.md#getwishlistitembyref)
- [getWishlistItems](modules.md#getwishlistitems)
- [getWishlistsByCustomer](modules.md#getwishlistsbycustomer)
- [updateWishlist](modules.md#updatewishlist)
- [updateWishlistItem](modules.md#updatewishlistitem)

## customerService

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
| `obj.token` | `string` | An access token from your TWC server API client. Keep it on your server; never send it to a browser. |

#### Returns

`void`

#### Defined in

[customerService/createCustomer.ts:15](https://github.com/The-Wishlist-Co/JavascriptSDK/blob/95ef5e7decb85ab18cf32f8fe935ee4f60d4634a/src/customerService/createCustomer.ts#L15)

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
| `obj.token` | `string` | An access token from your TWC server API client. Keep it on your server; never send it to a browser. |

#### Returns

`void`

#### Defined in

[customerService/getCustomerByID.ts:15](https://github.com/The-Wishlist-Co/JavascriptSDK/blob/95ef5e7decb85ab18cf32f8fe935ee4f60d4634a/src/customerService/getCustomerByID.ts#L15)

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
| `obj.token` | `string` | An access token from your TWC server API client. Keep it on your server; never send it to a browser. |

#### Returns

`void`

#### Defined in

[customerService/getCusotmerByRef.ts:15](https://github.com/The-Wishlist-Co/JavascriptSDK/blob/95ef5e7decb85ab18cf32f8fe935ee4f60d4634a/src/customerService/getCusotmerByRef.ts#L15)

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
| `obj.token` | `string` | An access token from your TWC server API client. Keep it on your server; never send it to a browser. |
| `obj.updateCustomerBody` | `Object` | The data to be sent in the request body for updating the customer. See https://the-wishlist-co.github.io/docs/customersvcApi.html#update for information on the fields. |

#### Returns

`void`

#### Defined in

[customerService/updateCustomer.ts:17](https://github.com/The-Wishlist-Co/JavascriptSDK/blob/95ef5e7decb85ab18cf32f8fe935ee4f60d4634a/src/customerService/updateCustomer.ts#L17)

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
| `obj.token` | `string` | An access token from your TWC server API client. Keep it on your server; never send it to a browser. |
| `obj.updateCustomerBody` | `Object` | The updated customer data. See https://the-wishlist-co.github.io/docs/customersvcApi.html#update for information on the fields. |

#### Returns

`void`

#### Defined in

[customerService/updateCustomerByID.ts:17](https://github.com/The-Wishlist-Co/JavascriptSDK/blob/95ef5e7decb85ab18cf32f8fe935ee4f60d4634a/src/customerService/updateCustomerByID.ts#L17)

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
| `obj.token` | `string` | An access token from your TWC server API client. Keep it on your server; never send it to a browser. |

#### Returns

`void`

#### Defined in

[wishlistService/createWishlist.ts:15](https://github.com/The-Wishlist-Co/JavascriptSDK/blob/95ef5e7decb85ab18cf32f8fe935ee4f60d4634a/src/wishlistService/createWishlist.ts#L15)

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
| `obj.token` | `string` | An access token from your TWC server API client. Keep it on your server; never send it to a browser. |

#### Returns

`void`

#### Defined in

[wishlistService/createWishlistItem.ts:15](https://github.com/The-Wishlist-Co/JavascriptSDK/blob/95ef5e7decb85ab18cf32f8fe935ee4f60d4634a/src/wishlistService/createWishlistItem.ts#L15)

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
| `obj.token` | `string` | An access token from your TWC server API client. Keep it on your server; never send it to a browser. |
| `obj.wishlistID?` | `string` | The ID of the wishlist to delete (either wishlistID or wishlistRef must be defined). |
| `obj.wishlistRef?` | `string` | The reference of the wishlist to delete (either wishlistID or wishlistRef must be defined). |

#### Returns

`void`

#### Defined in

[wishlistService/deleteWishlist.ts:17](https://github.com/The-Wishlist-Co/JavascriptSDK/blob/95ef5e7decb85ab18cf32f8fe935ee4f60d4634a/src/wishlistService/deleteWishlist.ts#L17)

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
| `obj.token` | `string` | An access token from your TWC server API client. Keep it on your server; never send it to a browser. |
| `obj.wishlistItemID` | `string` | The ID of the wishlist item to delete. |

#### Returns

`void`

#### Defined in

[wishlistService/deleteWishlistItemByID.ts:16](https://github.com/The-Wishlist-Co/JavascriptSDK/blob/95ef5e7decb85ab18cf32f8fe935ee4f60d4634a/src/wishlistService/deleteWishlistItemByID.ts#L16)

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
| `obj.token` | `string` | An access token from your TWC server API client. Keep it on your server; never send it to a browser. |
| `obj.wishlistItemRef` | `string` | The reference of the wishlist item to delete. |

#### Returns

`void`

#### Defined in

[wishlistService/deleteWishlistItemByRef.ts:15](https://github.com/The-Wishlist-Co/JavascriptSDK/blob/95ef5e7decb85ab18cf32f8fe935ee4f60d4634a/src/wishlistService/deleteWishlistItemByRef.ts#L15)

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
| `obj.token` | `string` | An access token from your TWC server API client. Keep it on your server; never send it to a browser. |

#### Returns

`void`

#### Defined in

[wishlistService/getItemsPopularity.ts:18](https://github.com/The-Wishlist-Co/JavascriptSDK/blob/95ef5e7decb85ab18cf32f8fe935ee4f60d4634a/src/wishlistService/getItemsPopularity.ts#L18)

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
| `obj.token` | `string` | An access token from your TWC server API client. Keep it on your server; never send it to a browser. |
| `obj.wishlistID?` | `string` | The ID of the wishlist to retrieve (either wishlistID or wishlistRef must be defined). |
| `obj.wishlistRef?` | `string` | The reference of the wishlist to retrieve (either wishlistID or wishlistRef must be defined). |

#### Returns

`void`

#### Defined in

[wishlistService/getWishlist.ts:22](https://github.com/The-Wishlist-Co/JavascriptSDK/blob/95ef5e7decb85ab18cf32f8fe935ee4f60d4634a/src/wishlistService/getWishlist.ts#L22)

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
| `obj.token` | `string` | An access token from your TWC server API client. Keep it on your server; never send it to a browser. |
| `obj.wishlistItemID` | `string` | The ID of the wishlist item to retrieve. |

#### Returns

`void`

#### Defined in

[wishlistService/getWishlistItemByID.ts:17](https://github.com/The-Wishlist-Co/JavascriptSDK/blob/95ef5e7decb85ab18cf32f8fe935ee4f60d4634a/src/wishlistService/getWishlistItemByID.ts#L17)

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
| `obj.token` | `string` | An access token from your TWC server API client. Keep it on your server; never send it to a browser. |
| `obj.wishlistItemRef` | `string` | The reference of the wishlist item to retrieve. |

#### Returns

`void`

#### Defined in

[wishlistService/getWishlistItemByRef.ts:16](https://github.com/The-Wishlist-Co/JavascriptSDK/blob/95ef5e7decb85ab18cf32f8fe935ee4f60d4634a/src/wishlistService/getWishlistItemByRef.ts#L16)

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
| `obj.token` | `string` | An access token from your TWC server API client. Keep it on your server; never send it to a browser. |
| `obj.wishlistID?` | `string` | The ID of the wishlist (either wishlistID or wishlistRef must be defined). |
| `obj.wishlistRef?` | `string` | The reference of the wishlist (either wishlistID or wishlistRef must be defined). |

#### Returns

`void`

#### Defined in

[wishlistService/getWishlistItems.ts:21](https://github.com/The-Wishlist-Co/JavascriptSDK/blob/95ef5e7decb85ab18cf32f8fe935ee4f60d4634a/src/wishlistService/getWishlistItems.ts#L21)

___

### getWishlistsByCustomer

▸ **getWishlistsByCustomer**(`obj`): `void`

Retrieves all wishlists for a customer, without their items. The response includes
`totalItemsAllWishlists` and each wishlist's details; use [getWishlistItems](modules.md#getwishlistitems) to load
the items for the wishlist the customer opens.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `obj` | `Object` | The configuration object. |
| `obj.customerID?` | `string` | The TWC ID of the customer (one of customerID, customerRef or email must be defined). |
| `obj.customerRef?` | `string` | The customer reference, i.e. the Shopify customer ID (one of customerID, customerRef or email must be defined). |
| `obj.email?` | `string` | The customer's email (one of customerID, customerRef or email must be defined). |
| `obj.lastItemId?` | `string` | The ID of the last wishlist retrieved. |
| `obj.onError` | (`error`: `any`) => `void` | The callback function to handle an error response. |
| `obj.onSuccess` | (`response`: `any`) => `void` | The callback function to handle a successful response. |
| `obj.pageSize?` | `number` | The number of wishlists to retrieve per page. |
| `obj.tenant` | `string` | The tenant identifier. |
| `obj.token` | `string` | An access token from your TWC server API client. Keep it on your server; never send it to a browser. |

#### Returns

`void`

#### Defined in

[wishlistService/getWishlistsByCustomer.ts:24](https://github.com/The-Wishlist-Co/JavascriptSDK/blob/95ef5e7decb85ab18cf32f8fe935ee4f60d4634a/src/wishlistService/getWishlistsByCustomer.ts#L24)

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
| `obj.token` | `string` | An access token from your TWC server API client. Keep it on your server; never send it to a browser. |
| `obj.updateWishlistBody` | `Object` | The body of the wishlist update request. See https://the-wishlist-co.github.io/docs/wishlistSvcAPI.html#update-wishlist-by-either-id-or-ref for information on the fields. |

#### Returns

`void`

#### Defined in

[wishlistService/updateWishlist.ts:17](https://github.com/The-Wishlist-Co/JavascriptSDK/blob/95ef5e7decb85ab18cf32f8fe935ee4f60d4634a/src/wishlistService/updateWishlist.ts#L17)

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
| `obj.token` | `string` | An access token from your TWC server API client. Keep it on your server; never send it to a browser. |
| `obj.updateWishlistItemBody` | `Object` | The body of the request containing the updated wishlist item data. See https://the-wishlist-co.github.io/docs/wishlistSvcAPI.html#update-a-wishlist-item-by-wishlist-item-id for information on the fields. |

#### Returns

`void`

#### Defined in

[wishlistService/updateWishlistItem.ts:18](https://github.com/The-Wishlist-Co/JavascriptSDK/blob/95ef5e7decb85ab18cf32f8fe935ee4f60d4634a/src/wishlistService/updateWishlistItem.ts#L18)
