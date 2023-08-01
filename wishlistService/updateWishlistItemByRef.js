// Bad Gateway error
const axiosInstance=require('../axios/AxiosInstance');

function updateWishlistItemByRef(obj) {
axiosInstance.put(`/wsservice/api/wishlist/items/ref=${obj.wishlistItemRef}`, obj.updateWishlistItemBody,
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

module.exports=updateWishlistItemByRef;