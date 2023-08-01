
const axiosInstance=require('../axios/AxiosInstance');

function updatePriceByID(obj) {
axiosInstance.put(`/pricesvc/api/prices/id=${obj.priceID}`, obj.updatePriceBody,
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

module.exports=updatePriceByID;