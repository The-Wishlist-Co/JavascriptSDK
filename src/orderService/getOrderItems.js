const axiosInstance=require('../axios/AxiosInstance')
 
function getOrderItems(obj) {

    const params = new URLSearchParams();
    obj.orderID&&params.append('orderId',obj.orderID);
    obj.orderRef&&params.append('orderRef', obj.orderRef);
 
axiosInstance.get(`/ordersvc/api/v1/orders/entries?${params.toString()}`,
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

module.exports=getOrderItems