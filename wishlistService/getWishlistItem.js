// This API supercedes the individual get wishlist Item by ID and get wishlist item by Ref and provides a single endpoint to do either. 
// Note that it is unlikely that a wishlist item ref will rarely be used.

const axiosInstance=require('../axios/AxiosInstance');
// require('dotenv').config();
function getWishlistItem(obj) {
  const params = new URLSearchParams(); 
  obj.wishlistID&&params.append('id',obj.wishlistID);
  obj.wishlistRef&&params.append('wishlistRef', obj.wishlistRef);

axiosInstance.get(`/wsservice/api/wishlist/items?${params.toString()}`, 
{headers: {
  'Content-Type': 'application/json', 
  'Authorization':  `Bearer ${obj.token}`,
  'X-TWC-Tenant': obj.tenant
}})
  .then(response => {
    obj.onSuccess(response.data);
  })
  .catch(error => {
    obj.onError(error?.response||error);
  });
}
// let onSuccess = function (lists) {
//     // Successfully fetched all lists 
//     console.log("Fetched all Lists", lists);
// }
// // Define error callback
// let onError = function (error) {
//     console.log("Error while fetching all Lists", error);
// }
// const token = process.env.token;
// const tenant = "sunils_electronics";
// const wishlistID = "ff95e17a-2c47-472d-bcfc-244f2e1b2b0d";
// getWishlistItemsByWishlistId({
//     onSuccess,
//     onError,
//     token,
//     tenant,
//     wishlistID
// });
module.exports=getWishlistItem
