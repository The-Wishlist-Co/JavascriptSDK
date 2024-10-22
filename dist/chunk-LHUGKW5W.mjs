import axios from 'axios';

// src/axios/AxiosInstance.ts
var axiosInstance = axios.create({
  baseURL: "https://api.au-sandbox.thewishlist.io/services"
});

export { axiosInstance };
