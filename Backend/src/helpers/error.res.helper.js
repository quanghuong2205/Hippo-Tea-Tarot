'use strict';

const CODES = require('../utils/code.http');
const STATUS = require('../utils/status.http');
const MESSAGES = require('../utils/message.http');

class ErrorResponse extends Error {
    constructor({ code, status, message }) {
        super(message);
        this.code = code;
        this.status = status;
    }
}

class NotFoundError extends ErrorResponse {
    constructor({
        code = CODES.NOT_FOUND,
        status = STATUS.NOT_FOUND,
        message = MESSAGES.NOT_FOUND,
    }) {
        super({ code, status, message });
    }
}

class ServerError extends ErrorResponse {
    constructor({
        code = CODES.SERVER_ERROR,
        status = STATUS.SERVER_ERROR,
        message = MESSAGES.SERVER_ERROR,
    }) {
        super({ code, status, message });
    }
}

class UnauthorizedError extends ErrorResponse {
    constructor({
        code = CODES.UNAUTHORIZED,
        status = STATUS.UNAUTHORIZED,
        message = MESSAGES.UNAUTHORIZED,
    }) {
        super({ code, status, message });
    }
}

class BadRequestError extends ErrorResponse {
    constructor({
        code = CODES.BAD_REQUEST,
        status = STATUS.BAD_REQUEST,
        message = MESSAGES.BAD_REQUEST,
    }) {
        super({ code, status, message });
    }
}

class ForbiddenError extends ErrorResponse {
    constructor({
        code = CODES.FORBIDDEN,
        status = STATUS.FORBIDDEN,
        message = MESSAGES.FORBIDDEN,
    }) {
        super({ code, status, message });
    }
}

class ManyRequestError extends ErrorResponse {
    constructor({
        code = CODES.MANY_REQUEST,
        status = STATUS.MANY_REQUEST,
        message = MESSAGES.MANY_REQUEST,
    }) {
        super({ code, status, message });
    }
}

class ConflictError extends ErrorResponse {
    constructor({
        code = CODES.CONFLICT,
        status = STATUS.CONFLICT,
        message = MESSAGES.CONFLICT,
    }) {
        super({ code, status, message });
    }
}

class NotMatchRouteError extends ErrorResponse {
    constructor({
        code = CODES.NOT_MATCH_ROUTE,
        status = STATUS.NOT_FOUND,
        message = 'Route not match',
    }) {
        super({ code, status, message });
    }
}

module.exports = {
    NotFoundError,
    UnauthorizedError,
    BadRequestError,
    ForbiddenError,
    ManyRequestError,
    ServerError,
    ConflictError,
    NotMatchRouteError,
};
