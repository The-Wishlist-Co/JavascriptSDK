//not working 400 bad request
const axiosInstance=require('../axios/AxiosInstance');

function updateOrderItemsByID(obj) {
axiosInstance.put(`/ordersvc/api/v1/orders/entries/id=${obj.entryID}`, obj.orderItemsBody,
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

module.exports=updateOrderItemsByID;