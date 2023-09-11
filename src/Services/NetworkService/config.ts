import {QueryClient} from '@tanstack/react-query';
import axios from 'axios';

import {KeychainStorageService} from 'Services';
import {BASE_URL} from 'Utils';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      retryDelay: 1000,
    },
    mutations: {},
  },
});

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 50000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

axiosInstance.interceptors.request.use(async config => {
  if (!config.headers.Authorization) {
    const token = await KeychainStorageService.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});
