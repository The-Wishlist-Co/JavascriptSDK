const axiosInstance=require('../axios/AxiosInstance');
require('dotenv').config();
function getWishlistByID(obj) {
axiosInstance.get(`/wsservice/api/wishlists/${obj.wishlistID}`, 
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
// const wishlistID = "0cb1529c-2bf8-45d2-a124-5a97fa692ab6";
// findWishlistByID({
//     onSuccess,
//     onError,
//     token,
//     tenant,   
//     wishlistID
// });

module.exports=getWishlistByID