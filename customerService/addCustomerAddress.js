// /customerservice/api/v2/customers/f98e5013-6361-4540-8ffc-d73ba27d1e44/address

const axiosInstance=require('../axios/AxiosInstance');

function addCustomerAddress(obj) {
axiosInstance.post(`/customerservice/api/v2/customers/${obj.customerID}/address`, obj.newAddress,
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

module.exports=addCustomerAddress;