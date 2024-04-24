const axiosInstance=require('../axios/AxiosInstance');

function createProductVariant(obj) {
axiosInstance.post(`/productsvc/api/v2/products/variants`, obj.productVariantBody,
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

module.exports=createProductVariant;