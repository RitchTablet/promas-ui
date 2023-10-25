import axios, { AxiosInstance, AxiosError, AxiosResponse } from 'axios';
import { TOKEN } from './constants';
import { toast } from 'react-toastify';
import { startLoading, stopLoading } from '../components/spinners/start-stop.spinner';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: `${process.env.REACT_APP_APi_HOST}/api/v1/`,
});

axiosInstance.interceptors.request.use(
  (config: any) => {
    startLoading();
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
    setTimeout(() => {
      stopLoading();
    }, 500);
    return response;
  },
  (error: AxiosError | any) => {
    console.log("Hubo un error en response", error);
    stopLoading();

    if(error.response) {
      const { status } = error?.response || {};
      const { data:{message} } = error?.response || {};
      if(status === 400) {
        toast.warning(`Hubo un error en la respuesta del servidor: ${message}`, { autoClose: 5000 });
      }
      if(status >= 500) {
        toast.error(`Hubo un error en la respuesta del servidor.`, { autoClose: 5000 });
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
