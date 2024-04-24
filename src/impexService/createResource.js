// /api/import/resource

const axiosInstance=require('../axios/AxiosInstance');

function createResource(obj) {
axiosInstance.post(`/impex/api/import/resource`, obj.newResourceBody,
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

module.exports=createResource;