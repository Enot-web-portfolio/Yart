import axios, { AxiosInstance } from 'axios';

import { CONFIG } from './config';
import { addSecretBeforeRequest, refreshSecret } from './interceptors';

export const http: AxiosInstance = axios.create({
  baseURL: CONFIG.apiUrl,
});

http.interceptors.request.use(addSecretBeforeRequest);

http.interceptors.response.use(config => config, refreshSecret);
