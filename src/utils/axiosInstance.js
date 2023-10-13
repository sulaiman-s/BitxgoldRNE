import axios from "axios";
import { store } from "../../App";

axios.defaults.baseURL = "http://192.168.2.106:8080";

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
