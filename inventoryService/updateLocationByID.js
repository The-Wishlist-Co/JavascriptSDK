
const axiosInstance=require('../axios/AxiosInstance');

function updateLocationByID(obj) {
axiosInstance.put(`/inventorysvc/api/location/id=${obj.locationID}`, obj.updateLocationBody,
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

module.exports=updateLocationByID;