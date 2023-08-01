
const axiosInstance=require('../axios/AxiosInstance');

function validateOrder(obj) {
axiosInstance.post(`/ordersvc/api/v1/orders/validate`, obj.createOrderBody,
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

module.exports=validateOrder;