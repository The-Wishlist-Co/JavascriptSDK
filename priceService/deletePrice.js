
const axiosInstance=require('../axios/AxiosInstance')
 
function deletePrice(obj) {
 
axiosInstance.delete(`/pricesvc/api/prices/${obj.priceID}`,
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

module.exports=deletePrice