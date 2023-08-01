// /api/wishlist/items
const axiosInstance=require('../axios/AxiosInstance');

function updateWishlistItemByID(obj) {
axiosInstance.put(`/wsservice/api/wishlist/items/id=${obj.wishlistItemID}`, obj.updateWishlistItemBody,
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

module.exports=updateWishlistItemByID;