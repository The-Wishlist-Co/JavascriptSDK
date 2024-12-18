// /api/v2/products/variants/{id}

const axiosInstance=require('../axios/AxiosInstance')

function deleteVariantByID(obj) {
axiosInstance.delete(`/productsvc/api/v2/products/variants/${obj.variantID}/`,
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

module.exports=deleteVariantByID