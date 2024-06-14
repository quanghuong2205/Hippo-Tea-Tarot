'use strict';

import axios from 'axios';
import config from '../../configs';
import {
    authResInterceptor,
    extractDataInterceptor,
    formatErrorInterceptor,
} from './interceptors.api';

/**
 * Init base api
 */
const BASE_URL = config.BASE_URL_API;
const apiBase = new axios.create({
    baseURL: BASE_URL,
});

/**
 * Apply interceptors
 */
apiBase.interceptors.request.use(authResInterceptor);
apiBase.interceptors.response.use(
    extractDataInterceptor,
    formatErrorInterceptor
);

export default apiBase;
