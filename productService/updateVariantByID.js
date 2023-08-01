const axiosInstance=require('../axios/AxiosInstance');

function updateVariantByID(obj) {
axiosInstance.put(`/productsvc/api/v2/products/variants/id=${obj.variantID}`, obj.updateProductVariantBody,
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

module.exports=updateVariantByID;