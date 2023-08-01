// /api/v2/products/validate

const axiosInstance=require('../axios/AxiosInstance');

function validateProductRequest(obj) {
axiosInstance.post(`/productsvc/api/v2/products/validate`, obj.newProductBody,
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

module.exports=validateProductRequest;