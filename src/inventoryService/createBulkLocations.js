
const axiosInstance=require('../axios/AxiosInstance');

function createBulkLocations(obj) {
axiosInstance.post(`/inventorysvc/api/locations`, obj.bulkLocationBody,
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

module.exports=createBulkLocations;