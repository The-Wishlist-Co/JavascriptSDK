// This API supercedes the individual API delete customer by ID, and allows deletion by either ID or Ref

const axiosInstance=require('../axios/AxiosInstance')
 
function deleteCustomer(obj) {
    const params = new URLSearchParams();
    
    obj.customerID&&params.append('id',obj.customerID);
    obj.customerRef&&params.append('customerRef', obj.customerRef);

axiosInstance.delete(`/customerservice/api/v2/customers?${params.toString()}`,
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

module.exports=deleteCustomer
