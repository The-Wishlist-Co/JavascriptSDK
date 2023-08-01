
const axiosInstance=require('../axios/AxiosInstance');

function createNewStock(obj) {
axiosInstance.post(`/inventorysvc/api/stocklevel`, obj.newStockBody,
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

module.exports=createNewStock;