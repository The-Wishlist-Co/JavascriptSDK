const axiosInstance=require('../axios/AxiosInstance')
require('dotenv').config();
function productSearch(obj) {

    const params = new URLSearchParams();
    
    obj.gtin&&params.append('gtin',obj.gtin);
    obj.productRef&&params.append('productRef', obj.productRef);

 
axiosInstance.get(`/productsvc/api/v2/products/lookup?${params.toString()}`,
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
// const gtin = "1000000000000";
// const productRef="10000008888jjj"
// productSearch({
//     onSuccess,
//     onError,
//     token,
//     tenant,
//     gtin,
//     productRef
// });
module.exports=productSearch