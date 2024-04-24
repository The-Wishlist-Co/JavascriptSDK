// 502 bad gateway

const axiosInstance=require('../axios/AxiosInstance')

function getMockChartData(obj) {
axiosInstance.get(`/productsvc/api/v2/products/${obj.requestID}/mockData`,
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

module.exports=getMockChartData