// not working

const axiosInstance=require('../axios/AxiosInstance')
 
function getStockLevelByID(obj) {

axiosInstance.get(`/inventorysvc/api/stocklevel/${obj.stockID}`,
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

module.exports=getStockLevelByID