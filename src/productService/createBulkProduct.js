// /api/v2/uploadProducts
const axiosInstance=require('../axios/AxiosInstance');

function createBulkProduct(obj) {
axiosInstance.post(`/productsvc/api/v2/uploadProducts`, obj.bulkProductBody,
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

module.exports=createBulkProduct;