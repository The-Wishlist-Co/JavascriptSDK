
const axiosInstance=require('../axios/AxiosInstance')
 
function searchOrderItemsEntry(obj) {

    const params = new URLSearchParams();
    obj.entryID&&params.append('entryId',obj.entryID);
    obj.entryRef&&params.append('entryRef', obj.entryRef);
    obj.orderID&&params.append('orderId', obj.orderID);
 
axiosInstance.get(`/ordersvc/api/v1/orders/entry?${params.toString()}`,
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

module.exports=searchOrderItemsEntry