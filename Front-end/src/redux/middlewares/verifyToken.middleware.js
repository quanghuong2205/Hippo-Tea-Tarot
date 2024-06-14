'use strict';
import authActions from '../actions/action.auth';
import { decodeToken } from '../../utils';

/** Temp */
const TOKEN_TIME_BEFORE_RESET = 1800000; //30 minutes

const verifyTokenMiddleware =
    (store) => (next) => async (action) => {
        /**
         * Check whether action require to verify token
         */
        if (!action?.meta?.isRequiredToVerifyToken) {
            return next(action);
        }

        /**
         * Get the token pari from the store
         */
        const authState = store.getState().auth;
        const accessToken = authState?.accessToken;
        const refreshToken = authState?.refreshToken;

        /**
         * Logout if the token not exist
         */
        if (!accessToken || !refreshToken) {
            return store.dispatch(authActions.signOutAction);
        }

        /**
         * Verify the expire time of the token
         */
        const decodedToken = decodeToken({
            token: accessToken,
        });

        const expiredTimeInMilliseconds =
            decodedToken.exp * 1000;
        const currentTimeInMilliseconds = Date.now();

        if (
            expiredTimeInMilliseconds -
                currentTimeInMilliseconds >
            TOKEN_TIME_BEFORE_RESET
        ) {
            return next(action);
        }

        /**
         * Get the new access token by refreshToken
         *   (if accessToken has been expired)
         */
        await store.dispatch(
            authActions.refreshTokenAction({ refreshToken })
        );

        /**
         * Logout if fail to get the new token pari
         */
        const newAuthState = store.getState().auth;
        const newAccessToken = newAuthState?.accessToken;
        const newRefreshToken = newAuthState?.refreshToken;
        if (!newAccessToken || !newRefreshToken) {
            return store.dispatch(authActions.signOutAction);
        }

        next(action);
    };

export default verifyTokenMiddleware;
