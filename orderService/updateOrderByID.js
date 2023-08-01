//not working 400 bad request
const axiosInstance=require('../axios/AxiosInstance');

function updateOrderByID(obj) {
axiosInstance.put(`/ordersvc/api/v1/orders/id=${obj.orderID}`, obj.createOrderBody,
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

module.exports=updateOrderByID;