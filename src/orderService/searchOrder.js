
const axiosInstance=require('../axios/AxiosInstance')
 
function searchOrder(obj) {

    const params = new URLSearchParams();
    obj.customerID&&params.append('customerId',obj.customerID);
    obj.customerRef&&params.append('customerRef', obj.customerRef);
    obj.orderID&&params.append('orderId',obj.orderID);
    obj.orderRef&&params.append('orderRef', obj.orderRef);
    obj.email&&params.append('email', obj.email);

axiosInstance.get(`/ordersvc/api/v1/orders/search?${params.toString()}`,
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

module.exports=searchOrder