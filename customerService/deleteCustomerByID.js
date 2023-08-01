//502 Bad gateway
const axiosInstance=require('../axios/AxiosInstance')
 
function deleteCustomerByID(obj) {

axiosInstance.delete(`/customerservice/api/v2/customers/${obj.customerID}`,
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

module.exports=deleteCustomerByID