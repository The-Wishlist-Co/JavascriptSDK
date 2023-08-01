const axios = require('axios');
const AxiosInstance = axios.create({
    baseURL: 'https://api.au-sandbox.thewishlist.io/services'
  });
  
module.exports = AxiosInstance;