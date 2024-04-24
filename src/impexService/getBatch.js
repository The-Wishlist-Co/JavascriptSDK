
const axiosInstance=require('../axios/AxiosInstance')
 
function getBatch(obj) {

    const params = new URLSearchParams();
    
    obj.batchID&&params.append('id',obj.batchID);
    obj.batchRef&&params.append('batchRef', obj.batchRef);
  
 
axiosInstance.get(`/impex/api/import/batch?${params.toString()}`,
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

module.exports=getBatch