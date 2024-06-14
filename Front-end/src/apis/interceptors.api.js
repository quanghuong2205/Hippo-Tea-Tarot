import { store } from '../redux/store';

/**
 * @desc attach http headers before sending the request
 */
const authResInterceptor = (request) => {
    const authState = store.getState().auth;
    const { accessToken, user } = authState;

    /* Attach to headers */
    if (accessToken) {
        request.headers['Authorization'] = `Bearer ${accessToken}`;
    }

    if (user) {
        request.headers['x-client-id'] = user._id;
    }

    return request;
};

/**
 * @desc Extract body from response
 */
const extractDataInterceptor = (response) => {
    return response.data.body;
};

/**
 * @desc Format error
 */
const formatErrorInterceptor = (error) => {
    console.log(error);
    if (error?.response) {
        return Promise.reject(error?.response.data);
    }

    return Promise.reject(error);
};

/**
 * Export interceptors
 */
export {
    authResInterceptor,
    extractDataInterceptor,
    formatErrorInterceptor,
};
