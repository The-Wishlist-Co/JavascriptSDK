
const axiosInstance=require('../axios/AxiosInstance');

function updateBatch(obj) {
axiosInstance.put(`/impex/api/import/batch`, obj.updateBatchBody,
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

module.exports=updateBatch;