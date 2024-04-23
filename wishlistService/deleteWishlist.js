// This API supercedes the individual delete wishlist by ID and delete wishlist by Ref and provides a single endpoint to delete by either ID or Ref.

const axiosInstance=require('../axios/AxiosInstance');
require('dotenv').config();
function deleteWishlist(obj) {

    const params = new URLSearchParams(); 
    obj.wishlistID&&params.append('id',obj.wishlistID);
    obj.wishlistRef&&params.append('wishlistRef', obj.wishlistRef);

axiosInstance.delete(`/wsservice/api/wishlists?${params.toString()}`, 
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

module.exports=deleteWishlist
