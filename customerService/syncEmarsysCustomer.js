// 502 Bad Gateway

 

const axiosInstance=require('../axios/AxiosInstance');

function syncEmarsysCustomer(obj) {
axiosInstance.put(`/customerservice/api/v2/emarsysCustomers`, obj.emarsysCustomerBody,
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

module.exports=syncEmarsysCustomer;