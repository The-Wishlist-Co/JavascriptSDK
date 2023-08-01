//   /wsservice/api/wishlist/items

const axiosInstance=require('../axios/AxiosInstance');

function updateCustomerByID(obj) {
axiosInstance.put(`/customerservice/api/v2/customers/id=${obj.customerID}`, obj.updateCustomerBody,
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

module.exports=updateCustomerByID;