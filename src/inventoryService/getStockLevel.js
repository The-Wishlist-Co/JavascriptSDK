

// inventorysvc/api/product/stocklevels

const axiosInstance=require('../axios/AxiosInstance')
 
function getStockLevel(obj) {

    // Guard: the service requires at least one of id / stockRef. Calling with neither
    // sends /stocklevel? with empty params and gets a 400 (logged as a WARN server-side).
    // Fail fast in the SDK instead of making that request.
    if (!obj.stockID && !obj.stockRef) {
        const error = new Error('getStockLevel requires a stockID or stockRef');
        if (typeof obj.onError === 'function') { obj.onError(error); } else { throw error; }
        return;
    }

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