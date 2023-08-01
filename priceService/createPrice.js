
const axiosInstance=require('../axios/AxiosInstance');

function createPrice(obj) {
axiosInstance.post(`/pricesvc/api/prices`, obj.priceBody,
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

module.exports=createPrice;