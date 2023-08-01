
const axiosInstance=require('../axios/AxiosInstance');
require('dotenv').config();
function getWishlistByCustomerID(obj) {
axiosInstance.get(`/wsservice/api/wishlists/customer/${obj.customerID}`, 
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
// const customerID = "98d9a379-c1ab-40b0-a044-b2cd73e27551";
// getWishlistByCustomerID({
//     onSuccess,
//     onError,
//     token,
//     tenant,   
//     customerID
// });

module.exports=getWishlistByCustomerID