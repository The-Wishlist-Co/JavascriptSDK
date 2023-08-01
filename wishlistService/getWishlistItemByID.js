// /api/wishlist/items/{id}
// /wsservice/api/wishlist/items/ref/Item 6
require('dotenv').config();
const axiosInstance=require('../axios/AxiosInstance');

function getWishlistItemByID(obj) {
axiosInstance.get(`/wsservice/api/wishlist/items/${obj.wishlistItemID}`, 
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
// const wishlistItemID = "2950c3b3-9381-40b0-b596-469047012a2e";
// getWishlistItemByID({
//     onSuccess,
//     onError,
//     token,
//     tenant,
//     wishlistItemID
// });
module.exports=getWishlistItemByID