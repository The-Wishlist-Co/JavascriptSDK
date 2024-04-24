
const axiosInstance=require('../axios/AxiosInstance')
 
function deleteOrderItemsEntry(obj) {

    const params = new URLSearchParams();
    obj.entryID&&params.append('entryId',obj.entryID);
    obj.entryRef&&params.append('entryRef', obj.entryRef);
 
 
axiosInstance.delete(`/ordersvc/api/v1/orders/entry?${params.toString()}`,
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

module.exports=deleteOrderItemsEntry