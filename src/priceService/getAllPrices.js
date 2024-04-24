//not working 500 internal server error
const axiosInstance=require('../axios/AxiosInstance')
 
function getAllPrices(obj) {
 
axiosInstance.get(`/pricesvc/api/prices/all`,
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

module.exports=getAllPrices