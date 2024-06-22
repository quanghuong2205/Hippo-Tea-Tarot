'use strict';

const AuthServices = require('../services/auth.service');
const { OK } = require('../utils/success.response.util');
const CODES = require('../utils/code.http');

/* Define the controller */
class UserController {
    static async uploadAvatar(req, res, next) {
        return new OK({
            message: 'Uploaded the avatar successfully',
            code: CODES.UPLOAD_IMAGE_SUCCESS,
            body: null,
        }).sendResponse(res);
    }
}

/* Export the controller */
module.exports = UserController;
