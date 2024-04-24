// /api/import/resource
const axiosInstance=require('../axios/AxiosInstance') 
function resourceLookup(obj) {
    
    const params = new URLSearchParams();
    obj.batchID&&params.append('batchId',obj.batchID);
    obj.batchRef&&params.append('batchRef', obj.batchRef);
    obj.entityType&&params.append('entityType', obj.entityType);
    obj.resourceID&&params.append('id', obj.resourceID);
    obj.importState&&params.append('importState', obj.importState);
    obj.validationState&&params.append('validationState', obj.validationState);
    


axiosInstance.get(`/impex/api/import/resource?${params.toString()}`,
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

module.exports=resourceLookup