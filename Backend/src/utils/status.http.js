'use strict';

const STATUS = {
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
};

module.exports = STATUS;
