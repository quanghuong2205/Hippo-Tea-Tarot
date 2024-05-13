'use strict';

const AuthServices = require('../services/auth.service');
const { OK } = require('../helpers/success.res.helper');
const CODES = require('../utils/code.http');

/* Define the controller */
class AuthController {
    /**
     *
     * @desc Sign in to account
     */
    static async signIn(req, res, next) {
        const body = await AuthServices.signIn({
            email: req.body.email,
            password: req.body.password,
        });

        return new OK({
            message: 'Sign in successfully',
            code: CODES.SIGN_IN_OK,
            body,
        }).sendResponse(res);
    }

    /**
     *
     * @desc Sign up an account
     */
    static async signUp(req, res, next) {
        const body = await AuthServices.signUp({
            email: req.body.email,
            password: req.body.password,
            name: req.body.name,
        });

        return new OK({
            message: 'Sign up successfully',
            code: CODES.SIGN_UP_OK,
            body,
        }).sendResponse(res);
    }
}

/* Export the controller */
module.exports = AuthController;
