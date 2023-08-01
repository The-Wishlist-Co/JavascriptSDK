// /api/v2/products/variants/validate

const axiosInstance=require('../axios/AxiosInstance');

function validateProductVariant(obj) {
axiosInstance.post(`/productsvc/api/v2/products/variants/validate`, obj.productVariantBody,
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

module.exports=validateProductVariant;