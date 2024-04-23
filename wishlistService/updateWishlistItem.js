// /api/wishlist/items
// This api allows update of wishlist item by ID or Ref, and supercedes the individual endpoints for updateWishlistItemByID and updateWishlistItemByRef

const axiosInstance=require('../axios/AxiosInstance');

function updateWishlistItem(obj) {
axiosInstance.put(`/wsservice/api/wishlist/items`, obj.updateWishlistItemBody,
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

module.exports=updateWishlistItem;
