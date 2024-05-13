'use strict';
const {
    ServerError,
    UnauthorizedError,
} = require('../helpers/error.res.helper');
const CODES = require('../utils/code.http');
const jwt = require('jsonwebtoken');
require('dotenv').config();

/**
 * JWT Information
 */
const JWT = {
    ACCESS_TOKEN_ALGORITHM: process.env.JWT_ACCESS_TOKEN_ALGORITHM,
    REFRESH_TOKEN_ALGORITHM: process.env.JWT_REFRESH_TOKEN_ALGORITHM,
    ACCESS_TOKEN_EXPIRES: process.env.JWT_ACCESS_TOKEN_EXPIRES,
    REFRESH_TOKEN_EXPIRES: process.env.JWT_REFRESH_TOKEN_EXPIRES,
};

/* Define the service */
class JWTServices {
    /**
     * @desc Sign an access token
     * @param {string} publicKey
     * @param {object} payload
     * @returns
     */
    static async signAccessToken({ publicKey, payload }) {
        try {
            /* Sign the token */
            const accessToken = await jwt.sign(payload, publicKey, {
                algorithm: JWT.ACCESS_TOKEN_ALGORITHM,
                expiresIn: JWT.ACCESS_TOKEN_EXPIRES,
            });

            /* Verify the token */

            await jwt.verify(accessToken, publicKey, {
                algorithms: JWT.ACCESS_TOKEN_ALGORITHM,
            });

            /* Return the token + expire Date*/
            return accessToken;
        } catch (error) {
            console.log(error);
            throw new ServerError({
                message: 'Internal Server Error',
                code: CODES.FAIL_TO_SIGN_ACCESS_TOKEN,
            });
        }
    }

    /**
     * @desc Sign an refresh token
     * @param {string} privateKey
     * @param {object} payload
     * @returns
     */
    static async signRefreshToken({ privateKey, payload }) {
        try {
            /* Sign the token */
            const refreshToken = await jwt.sign(payload, privateKey, {
                algorithm: JWT.REFRESH_TOKEN_ALGORITHM,
                expiresIn: JWT.REFRESH_TOKEN_EXPIRES,
            });

            /* Verify the token */
            await jwt.verify(refreshToken, privateKey, {
                algorithms: JWT.REFRESH_TOKEN_ALGORITHM,
            });

            /* Return the token */
            return refreshToken;
        } catch (error) {
            throw new ServerError({
                message: 'Internal Server Error',
                code: CODES.FAIL_TO_SIGN_REFRESH_TOKEN,
            });
        }
    }

    /**
     * @desc Sign a pair of tokens (access token and refresh token)
     * @param {string} publicKey
     * @param {string} privateKey
     * @param {object} payload
     * @returns
     */
    static async signTokenPair({ publicKey, privateKey, payload }) {
        /* Sign access token */
        const accessToken = await JWTServices.signAccessToken({
            publicKey,
            payload,
        });

        /* Sign refresh token */
        const refreshToken = await JWTServices.signRefreshToken({
            privateKey,
            payload,
        });

        return {
            accessToken,
            refreshToken,
        };
    }

    /**
     * @desc Verify the access token
     * @param {string} publicKey
     * @param {object} payload
     * @returns
     */
    static async verifyAccessToken({ publicKey, accessToken }) {
        try {
            /* Verify the token */
            const decodedPayload = await jwt.verify(
                accessToken,
                publicKey,
                {
                    algorithms: JWT.ACCESS_TOKEN_ALGORITHM,
                }
            );

            /* Return the payload */
            return decodedPayload;
        } catch (error) {
            throw new UnauthorizedError({
                message: 'Unauthorized',
                code: CODES.INVALID_ACCESS_TOKEN,
            });
        }
    }

    /**
     * @desc Verify the refresh token
     * @param {string} privateKey
     * @param {object} payload
     * @returns
     */
    static async verifyRefreshToken({ privateKey, refreshToken }) {
        try {
            /* Verify the token */
            const decodedPayload = await jwt.verify(
                refreshToken,
                privateKey,
                {
                    algorithms: JWT.REFRESH_TOKEN_ALGORITHM,
                }
            );

            /* Return the payload */
            return decodedPayload;
        } catch (error) {
            throw new UnauthorizedError({
                message: 'Unauthorized',
                code: CODES.INVALID_REFRESH_TOKEN,
            });
        }
    }
}

/**
 * Export service
 */
module.exports = JWTServices;
