import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
// Add a request interceptor
const axiosClient = axios.create({
  baseURL: "http://192.168.1.107:8000/api",
  withCredentials: true,
  headers: {
    Accept: "application/json",
    "X-Requested-With": "XMLHttpRequest",
  },
});

axiosClient.interceptors.request.use(
  async function (config) {
    const token = await AsyncStorage.getItem("TOKEN");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);
export default axiosClient;
