
const axiosInstance=require('../axios/AxiosInstance');

function updatePriceByRef(obj) {
axiosInstance.put(`/pricesvc/api/prices/ref=${obj.priceRef}`, obj.updatePriceBody,
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

module.exports=updatePriceByRef;