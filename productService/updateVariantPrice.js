// /api/v2/products/variants/{variantId}/price

const axiosInstance=require('../axios/AxiosInstance');

function updateVariantPrice(obj) {
axiosInstance.put(`/productsvc/api/v2/products/variants/${obj.variantID}/price`, obj.variantPrice,
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

module.exports=updateVariantPrice;