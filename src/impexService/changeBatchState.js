
const axiosInstance=require('../axios/AxiosInstance');

function changeBatchState(obj) {

    const params = new URLSearchParams();
    
    obj.batchID&&params.append('batchId',obj.batchID);
    obj.batchRef&&params.append('batchRef', obj.batchRef);
    obj.state&&params.append('state', obj.state);
//   console.log(params.toString());
axiosInstance.put(`/impex/api/import/batch/state-change?${params.toString()}`,{},
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

module.exports=changeBatchState;