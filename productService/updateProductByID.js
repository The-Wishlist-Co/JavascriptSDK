

//   /wsservice/api/wishlist/items

const axiosInstance=require('../axios/AxiosInstance');

function updateProductByID(obj) {
axiosInstance.put(`/productsvc/api/v2/products/id=${obj.productID}`, obj.updateProductBody,
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

module.exports=updateProductByID;