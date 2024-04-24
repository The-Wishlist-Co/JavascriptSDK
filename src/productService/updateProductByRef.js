// /productsvc/api/v2/products/ref=PRD6237978

const axiosInstance=require('../axios/AxiosInstance');

function updateProductByRef(obj) {
    axiosInstance.put(`/productsvc/api/v2/products/ref=${obj.productRef}`, obj.updateProductBody,
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
    
    module.exports=updateProductByRef;