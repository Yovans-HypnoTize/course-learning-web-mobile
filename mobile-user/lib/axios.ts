import axios from 'axios';
import {
  baseURL,
  removeStoredItemInCookie,
  getDataFromCookie,
  storeDataInCookie,
  toastAndroid,
} from '../utils/Utils';
import { Toast } from 'toastify-react-native';

const axiosInstance = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

axiosInstance.interceptors.request.use(
  async config => {
    const token = await getDataFromCookie('access_token');
    if (token) {
      config.headers['Authorization'] = token;
    }
    return config;
  },
  error => Promise.reject(error),
);

axiosInstance.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    // Token expired & not already trying to refresh
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise(function (resolve, reject) {
          failedQueue.push({ resolve, reject });
        })
          .then(token => {
            originalRequest.headers['Authorization'] = token;
            return axiosInstance(originalRequest);
          })
          .catch(err => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const response = await axios.post(
          baseURL + '/auth/refreshToken',
          {
            refreshToken: getDataFromCookie('refresh_token'),
          },
          {
            headers: {
              Authorization: `${getDataFromCookie('refresh_token')}`,
            },
          },
        );

        const newAccessToken = response.data.accessToken;
        await storeDataInCookie('access_token', newAccessToken);

        processQueue(null, newAccessToken);

        axiosInstance.defaults.headers.common[
          'Authorization'
        ] = `${newAccessToken}`;
        originalRequest.headers['Authorization'] = newAccessToken;
        processQueue(null, newAccessToken);
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        // Redirect to login or clear session
        await removeStoredItemInCookie('access_token');
        Toast.error('Session expired. Please log in again.');

        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    const message =
      error.response?.data?.message ||
      'Something went wrong. Please try again.';
      toastAndroid(message)
    // Toast.error(message);
    return Promise.reject(error);
  },
);

export default axiosInstance;
