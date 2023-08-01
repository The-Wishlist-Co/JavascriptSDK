
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