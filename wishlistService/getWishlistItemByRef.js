// /wsservice/api/wishlist/items/ref/Item 6
// require('dotenv').config();
const axiosInstance=require('../axios/AxiosInstance');

function getWishlistItemByRef(obj) {
axiosInstance.get(`/wsservice/api/wishlist/items/ref/${obj.wishlistItemRef}`, 
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
// const wishlistItemRef = "Item 6";
// getWishlistItemByRef({
//     onSuccess,
//     onError,
//     token,
//     tenant,
//     wishlistItemRef
// });
module.exports=getWishlistItemByRef