 
const axiosInstance=require('../axios/AxiosInstance')
 
function getPrice(obj) {

    const params = new URLSearchParams();
    obj.priceID&&params.append('id',obj.priceID);
    obj.priceRef&&params.append('priceRef', obj.priceRef);
 
axiosInstance.get(`/pricesvc/api/prices?${params.toString()}`,
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

module.exports=getPrice