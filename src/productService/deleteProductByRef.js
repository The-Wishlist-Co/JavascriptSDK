

const axiosInstance=require('../axios/AxiosInstance')
function deleteProductByRef(obj) {

axiosInstance.delete(`/productsvc/api/v2/products/${obj.productRef}/byref`,
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

module.exports=deleteProductByRef