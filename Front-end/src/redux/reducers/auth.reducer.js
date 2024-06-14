'use strict';
import { createReducer } from '@reduxjs/toolkit';
import AUTH_TYPES from '../constants/auth.constant';

/**
 * Initial State
 */
const initalAuthState = {
    user: null,
    accessToken: null,
    refreshToken: null,
};

/**
 * Reducer engine
 */
const authReducer = createReducer(initalAuthState, (builder) => {
    /* REFRRESH TOKEN */
    builder.addCase(AUTH_TYPES.REFRESH_TOKEN, (state, { payload }) => {
        const { accessToken, refreshToken } = payload;
        state.accessToken = accessToken;
        state.refreshToken = refreshToken;
        return state;
    });

    /* SIGN OUT */
    builder.addCase(AUTH_TYPES.SIGN_OUT, (state) => {
        state = {
            user: null,
            user_id: null,
            accessToken: null,
            refreshToken: null,
        };

        return state;
    });

    /**
     * INIT AUTH
     * SIGN IN
     */
    builder.addMatcher(
        ({ type }) => {
            return (
                type === AUTH_TYPES.INIT_AUTH ||
                type === AUTH_TYPES.SIGN_IN
            );
        },
        (state, { payload }) => {
            state.accessToken = payload.accessToken;
            state.refreshToken = payload.refreshToken;
            state.user = payload.user;
            return state;
        }
    );

    builder.addDefaultCase((state) => {
        return state;
    });
});

export default authReducer;
