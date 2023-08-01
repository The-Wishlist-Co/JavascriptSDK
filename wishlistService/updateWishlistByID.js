
const axiosInstance=require('../axios/AxiosInstance');

function updateWishlistByID(obj) {
axiosInstance.put(`/wsservice/api/wishlists/id=${obj.wishlistID}`, obj.updateWishlistByIDBody,
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

module.exports=updateWishlistByID;