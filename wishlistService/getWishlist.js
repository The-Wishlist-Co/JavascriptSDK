// /api/wishlists
// Get wishlist by wishlistID or wishlistRef
// This API supercedes the individual APIs for get wishlist by ID and get Wishlist by Ref and allows either ref or ID to be used.

require('dotenv').config();
const axiosInstance=require('../axios/AxiosInstance');


function getWishlist(obj) {
  
  const params = new URLSearchParams(); 
obj.wishlistID&&params.append('id',obj.wishlistID);
obj.wishlistRef&&params.append('wishlistRef', obj.wishlistRef);
axiosInstance.get(`/wsservice/api/wishlists?${params.toString()}`, 
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
//     console.log("Fetched all Lists", lists.wishlistItems);
// }
// // Define error callback
// let onError = function (error) {
//     console.log("Error while fetching all Lists", error);
// }
// const token = process.env.token;
// console.log(token)
// const tenant = "sunils_electronics";
// // const wishlistID = "ff95e17a-2c47-472d-bcfc-244f2e1b2b0d";
// const wishlistID="0cb1529c-2bf8-45d2-a124-5a97fa692ab6";
// getWishlistById({
//     onSuccess,
//     onError,
//     token,
//     tenant,
//     wishlistID
// });

module.exports=getWishlist
