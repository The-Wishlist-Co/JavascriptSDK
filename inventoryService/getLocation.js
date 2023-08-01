//not working
const axiosInstance=require('../axios/AxiosInstance')
 
function getLocation(obj) {

    const params = new URLSearchParams();
    obj.locationID&&params.append('id',obj.locationID);
    obj.locationRef&&params.append('locationRef', obj.locationRef);
 
axiosInstance.get(`/inventorysvc/api/location?${params.toString()}`,
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

module.exports=getLocation