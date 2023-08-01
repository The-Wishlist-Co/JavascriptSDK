const axiosInstance=require('../axios/AxiosInstance');
require('dotenv').config();

function getWishlistByRef(obj) {
axiosInstance.get(`/wsservice/api/wishlists/${obj.wishlistRef}/byref`, 
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

module.exports=getWishlistByRef