

//   /wsservice/api/wishlist/items

const axiosInstance=require('../axios/AxiosInstance');

function updateProduct(obj) {
axiosInstance.put(`/productsvc/api/v2/products`, obj.updateProductBody,
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

module.exports=updateProduct;