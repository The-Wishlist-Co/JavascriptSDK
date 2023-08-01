
// /api/v2
const axiosInstance=require('../axios/AxiosInstance');

function createBulkCustomers(obj) {
axiosInstance.post(`/customerservice/api/v2/upload-customers/`, obj.createBulkCustomerBody,
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

module.exports=createBulkCustomers;