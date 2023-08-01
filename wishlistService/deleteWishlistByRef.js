// /api/wishlists/{wishlistRef}/byref

const axiosInstance=require('../axios/AxiosInstance');
require('dotenv').config();
function deleteWishlistByRef(obj) {

axiosInstance.delete(`/wsservice/api/wishlists/${obj.wishlistRef}/byref`, 
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

module.exports=deleteWishlistByRef