'use strict';

const { STATES } = require('mongoose');
const CODES = require('./code.http');
const STATUS = require('./status.http');
const MESSAGES = require('./message.http');

class SuccessResponse {
    constructor({ code, status, message, body, options }) {
        this.code = code;
        this.status = status;
        this.message = message;
        this.body = body;
        this.options = options;
    }

    sendResponse(responseObject) {
        return responseObject.json({
            code: this.code,
            status: this.status,
            message: this.message,
            body: this.body,
            options: this.options,
        });
    }
}

class OK extends SuccessResponse {
    constructor({
        code = CODES.OK,
        status = STATUS.OK,
        message = MESSAGES.OK,
        body = {},
        options = {},
    }) {
        super({ code, status, message, body, options });
    }
}

class CREATED extends SuccessResponse {
    constructor({
        code = CODES.CREATED,
        status = STATUS.CREATED,
        message = MESSAGES.CREATED,
        body = {},
        options = {},
    }) {
        super({ code, status, message, body, options });
    }
}

module.exports = {
    OK,
    CREATED,
};
