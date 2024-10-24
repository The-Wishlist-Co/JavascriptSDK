import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: 'https://api.au-aws.thewishlist.io/services'
});
