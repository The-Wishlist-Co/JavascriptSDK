
const axiosInstance=require('../axios/AxiosInstance');

function validatePrice(obj) {
axiosInstance.post(`/pricesvc/api/prices/validate`, obj.priceBody,
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

module.exports=validatePrice;