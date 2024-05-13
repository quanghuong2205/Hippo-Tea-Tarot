'use strict';

const MESSAGES = {
    /* SUCCESS */
    OK: 'Success',
    CREATED: 'Created',

    /* ERROR */
    BAD_REQUEST: 'Bad Request',
    UNAUTHORIZED: 'Unauthorization',
    FORBIDDEN: 'No Access',
    NOT_FOUND: 'Not Found',
    MANY_REQUEST: 'Too Many Requests',
    CONFLICT: 'Config, already existed',

    /* SERVER ERROR */
    SERVER_ERROR: 'Internal Server Error',
};

module.exports = MESSAGES;
