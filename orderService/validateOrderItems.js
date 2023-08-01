
const axiosInstance=require('../axios/AxiosInstance');

function validateOrderItems(obj) {
axiosInstance.post(`/ordersvc/api/v1/orders/entries/validate`, obj.orderItemsBody,
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

module.exports=validateOrderItems;