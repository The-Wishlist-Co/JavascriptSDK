
const axiosInstance=require('../axios/AxiosInstance');

function createBulkStock(obj) {
axiosInstance.post(`/inventorysvc/api/stocklevels`, obj.bulkStockBody,
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

module.exports=createBulkStock;