import axios, { AxiosInstance, AxiosError, AxiosResponse } from 'axios';
import { TOKEN } from './constants';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: `${process.env.REACT_APP_APi_HOST}/api/v1/`,
});

axiosInstance.interceptors.request.use(
  (config: any) => {
    const token = localStorage.getItem(TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
