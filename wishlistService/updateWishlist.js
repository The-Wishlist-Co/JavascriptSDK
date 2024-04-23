// This API endpoint supercedes the individual APIS update wishlist by ID and update Wishlsit by Ref and provides a single endpoint to do either

const axiosInstance=require('../axios/AxiosInstance');

function updateWishlist(obj) {
axiosInstance.put(`/wsservice/api/wishlists`, obj.updateWishlistBody,
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

module.exports=updateWishlist;
