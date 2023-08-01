// inventorysvc/api/product/stocklevels

const axiosInstance=require('../axios/AxiosInstance')
 
function getVariantStock(obj) {

    const params = new URLSearchParams();
    
    obj.lastItemId&&params.append('lastItemId',obj.lastItemId);
    obj.locationId&&params.append('locationId', obj.locationId);
    obj.locationRef&&params.append('locationRef',obj.locationRef);
    obj.variantID&&params.append('productVariantId', obj.variantID);
    obj.variantRef&&params.append('productVariantRef', obj.variantRef);
    obj.pageSize&&params.append('pageSize', obj.pageSize);
 
axiosInstance.get(`/inventorysvc/api/product/stocklevels?${params.toString()}`,
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

module.exports=getVariantStock