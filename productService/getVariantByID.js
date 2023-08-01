const axiosInstance=require('../axios/AxiosInstance')

function getProductVariant(obj) {
axiosInstance.get(`/productsvc/api/v2/products/${obj.productID}/variants/${obj.variantID}/`,
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

module.exports=getProductVariant