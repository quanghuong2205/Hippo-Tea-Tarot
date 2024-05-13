'use strict';

const CODES = {
    /**
     * SELF-DEFINED CODES
     */

    /* AUTHENTICATION */
    AUTH_MISS_CLIENT_ID: '00001',
    AUTH_INVALID_CLIENT_ID: '00002',
    AUTH_NOT_REGISTED: '001',
    AUTH_USER_NOT_EXISTED: '003',
    AUTH_USER_EXISTED: '002',
    AUTH_SIGN_IN_OK: '301',
    AUTH_SIGN_UP_OK: '302',
    AUTH_SIGN_OUT_OK: '303',
    AUTH_WRONG_PASSWORD: '011',

    /**
     * DEFAULT CODES
     */

    /* SUCCESS */
    OK: 200,
    CREATED: 201,

    /* ERROR */
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    MANY_REQUEST: 429,
    CONFLICT: 409,

    /* SERVER ERROR */
    SERVER_ERROR: 500,
    NOT_MATCH_ROUTE: 8800,
};

module.exports = CODES;
