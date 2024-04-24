

// inventorysvc/api/product/stocklevels

const axiosInstance=require('../axios/AxiosInstance')
 
function getStockLevel(obj) {

    const params = new URLSearchParams();
    
    obj.stockID&&params.append('id',obj.stockID);
    obj.stockRef&&params.append('stockRef', obj.stockRef);
  
 
axiosInstance.get(`/inventorysvc/api/stocklevel?${params.toString()}`,
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

module.exports=getStockLevel