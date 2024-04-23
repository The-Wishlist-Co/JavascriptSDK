//   /wsservice/api/wishlist/items
//  Update customer by either ID or Ref.  Supercedes the individual update customer by ID and update customer by Ref apis

const axiosInstance=require('../axios/AxiosInstance');

function updateCustomer(obj) {
axiosInstance.put(`/customerservice/api/v2/customers`, obj.updateCustomerBody,
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

module.exports=updateCustomer;
