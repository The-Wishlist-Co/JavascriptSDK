const axiosInstance=require('../axios/AxiosInstance') 
function batchLookup(obj) {
    
    const params = new URLSearchParams();
    obj.batchID&&params.append('id',obj.batchID);
    obj.batchRef&&params.append('batchRef', obj.batchRef);
    obj.state&&params.append('state', obj.state);
    obj.withTotal&&params.append('withTotal', obj.withTotal);
  
axiosInstance.get(`/impex/api/import/batch/batchQuery?${params.toString()}`,
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

module.exports=batchLookup