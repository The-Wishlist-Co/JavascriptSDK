
const axiosInstance=require('../axios/AxiosInstance');

function validateLocation(obj) {
axiosInstance.post(`/inventorysvc/api/location/validate`, obj.newLocationBody,
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

module.exports=validateLocation;