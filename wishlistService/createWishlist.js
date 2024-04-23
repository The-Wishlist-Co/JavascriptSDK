
const axiosInstance=require('../axios/AxiosInstance');

function createWishlist(obj) {
axiosInstance.post(`/wsservice/api/wishlists`, obj.newWishlistBody,
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

module.exports=createWishlist;
