'use strict';
import AUTH_TYPES from '../constants/auth.constant';
import STORAGE_KEYS from '../../constants/storage-key.constant';
import { refreshTokenApi } from '../../apis/auth.api';

/* Action handlers */
const initAuthAction = () => async (dispatch) => {
    /**
     * Get auth infor from localstorage
     */
    const tokens = JSON.parse(localStorage.getItem(STORAGE_KEYS.TOKENS));
    const user = JSON.parse(localStorage.getItem(STORAGE_KEYS.USER_INFOR));
    if (!tokens && !user) {
        return;
    }

    /**
     * Init authentication information
     */
    dispatch({
        type: AUTH_TYPES.INIT_AUTH,
        payload: {
            accessToken: tokens.accessToken,
            refreshToken: tokens.refreshToken,
            user,
        },
    });
};

const signInAction = (payload) => (dispatch) => {
    /**
     * Payload: {tokens, user}
     */

    /**
     * Save token and user information
     *   to the storage
     */
    localStorage.setItem(
        STORAGE_KEYS.USER_INFOR,
        JSON.stringify(payload.user)
    );
    localStorage.setItem(
        STORAGE_KEYS.TOKENS,
        JSON.stringify(payload.tokens)
    );

    /**
     * Dispatch
     */
    dispatch({
        type: AUTH_TYPES.SIGN_IN,
        payload: {
            user: payload.user,
            accessToken: payload.tokens.accessToken,
            refreshToken: payload.tokens.refreshToken,
        },
    });
};

const signOutAction =
    ({ navigate }) =>
    (dispatch) => {
        /**
         * Clear the local storage
         */
        localStorage.removeItem(STORAGE_KEYS.TOKENS);
        localStorage.removeItem(STORAGE_KEYS.USER_INFOR);

        /**
         * Dispatch
         */
        dispatch({
            type: AUTH_TYPES.SIGN_OUT,
        });

        /* Navigate */
        navigate('/auth');
    };

const refreshTokenAction =
    ({ refreshToken }) =>
    async (dispatch) => {
        /**
         * Get the pair of tokens
         */
        const data = await refreshTokenApi({
            refreshToken,
        });

        if (data.body?.refreshToken) {
            dispatch({
                type: AUTH_TYPES.REFRESH_TOKEN,
                payload: {
                    refreshToken: data.body.refreshToken,
                    accessToken: data.body.accessToken,
                },
            });
        }
    };

const authActions = {
    signInAction,
    initAuthAction,
    signOutAction,
    refreshTokenAction,
};

export default authActions;
