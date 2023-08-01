// /api/wishlists/customer/{customerRef}/byref

const axiosInstance=require('../axios/AxiosInstance');
require('dotenv').config();
function getWishlistByCustomerRef(obj) {
axiosInstance.get(`/wsservice/api/wishlists/customer/${obj.customerRef}/byref`, 
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
module.exports=getWishlistByCustomerRef;