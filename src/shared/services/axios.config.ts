import axios, { AxiosError } from "axios";
import Constants from "expo-constants";

const baseURL = Constants?.manifest?.extra?.apiUrl;
// AXIOS INSTANCE
const axiosInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// ERROR HANDLER
const errorHandler = (error: AxiosError) => {
  console.log("erro:", error);
  if (error.response) {
    const data: any = error.response.data;

    if (error.response.status === 400) {
      return Promise.reject(data.error);
    }
    if (error.response.status === 401 || error.response.status === 404) {
      return Promise.reject(data);
    }
  }
  if (error.code === "ERR_NETWORK") {
    return Promise.reject({ message: "Erro de Rede. Tente Novamente!" });
  }
  return Promise.reject({ message: "Um erro inesperado ocorreu" });
};

// REQUEST INTERCEPTOR
axiosInstance.interceptors.request.use(async (config) => {
  return config;
}, errorHandler);

// RESPONSE INTERCETOPTOR
axiosInstance.interceptors.response.use(async (response) => {
  return response.data;
}, errorHandler);

export default axiosInstance;
