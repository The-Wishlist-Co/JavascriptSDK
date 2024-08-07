
const axiosInstance=require('../axios/AxiosInstance');

function createNewBatch(obj) {
axiosInstance.post(`/impex/api/import/batch`, obj.newBatchBody,
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

module.exports=createNewBatch;