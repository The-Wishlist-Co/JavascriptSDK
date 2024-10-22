twc / [Exports](modules.md)

## Install

```
npm i @thewishlistco/twc
```

or with yarn:

```
yarn add @thewishlistco/twc
```

## Usage Example

```js
// import the package and method
import { getWishlist } from "twc";

// call the method
getWishlist({
  wishlistRef: "<wishlist ref>",
  token: "<token>",
  tenant: "<tenant id>",
  token: "<your token>",
  onSuccess: (response) => {
    // do something with the response
    console.log(response);
  },
});
```
