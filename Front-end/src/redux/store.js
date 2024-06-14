'use strict';
import { configureStore } from '@reduxjs/toolkit';
import reducer from './reducers';

import authActions from './actions/action.auth';

/* Middleware */
import verifyTokenMiddleware from './middlewares/verifyToken.middleware';

/**
 * Create store
 */
const store = configureStore({
    reducer: reducer,
    // middleware: (getDefaultMiddleware) =>
    //     getDefaultMiddleware().concat(verifyTokenMiddleware),
});

/**
 * @desc Init the store
 */
const initStore = async () => {
    try {
        /* Init auth */
        await store.dispatch(authActions.initAuthAction());

        /* Return store */
        return store;
    } catch (error) {
        throw new Error('Encouter error while initing the store');
    }
};

export { store, initStore };
