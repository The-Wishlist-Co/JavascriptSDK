// /api/location/locationRef={locationRef}


const axiosInstance=require('../axios/AxiosInstance');

function updateLocationByRef(obj) {
axiosInstance.put(`/inventorysvc/api/location/locationRef=${obj.locationRef}`, obj.updateLocationBody,
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

module.exports=updateLocationByRef;