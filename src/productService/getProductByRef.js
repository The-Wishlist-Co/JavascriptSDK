

const axiosInstance=require('../axios/AxiosInstance')
// require('dotenv').config();
function getProductByRef(obj) {

axiosInstance.get(`/productsvc/api/v2/products/ref/${obj.productRef}`,
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
// const productRef="PRD6237996";

// getProductByRef({
//     onSuccess,
//     onError,
//     token,
//     tenant,
//     productRef
// });
module.exports=getProductByRef