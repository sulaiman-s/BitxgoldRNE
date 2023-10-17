import axios from "axios";
import { store } from "reduxKit/reducers/slices";

export const baseURL = "https://nodeapi.bitx.gold";
axios.defaults.baseURL = baseURL;

const axiosInstance = axios.create();

axiosInstance.interceptors.request.use(
  (config) => {
    const token = store.getState().user.token;
    if (token) {
      config.headers["authorization"] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
