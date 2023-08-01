

const axiosInstance=require('../axios/AxiosInstance')
require('dotenv').config();
function validateProductID(obj) {
axiosInstance.get(`/productsvc/api/v2/products/validate/${obj.productID}`,
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
// const productID="78478311-0d6f-4b5f-8102-8d04b5c3ebd4";

// validateProductID({
//     onSuccess,
//     onError,
//     token,
//     tenant,
//     productID
// });
module.exports=validateProductID