'use strict';

const AuthServices = require('../services/auth.service');
const { OK } = require('../utils/success.response.util');
const CODES = require('../utils/code.http');

/* Define the controller */
class AuthController {
    /**
     *
     * @desc Sign in to account
     */
    static async signIn(req, res, next) {
        return new OK({
            message: 'Sign in successfully',
            code: CODES.SIGN_IN_OK,
            body: await AuthServices.signIn({
                email: req.body.email,
                password: req.body.password,
            }),
        }).sendResponse(res);
    }

    /**
     *
     * @desc Sign up an account
     */
    static async signUp(req, res, next) {
        return new OK({
            message: 'Sign up successfully',
            code: CODES.SIGN_UP_OK,
            body: await AuthServices.signUp({
                email: req.body.email,
                password: req.body.password,
                name: req.body.name,
            }),
        }).sendResponse(res);
    }

    /**
     *
     * @desc Logout the account
     */
    static async signOut(req, res, next) {
        return new OK({
            message: 'Sign out successfully',
            code: CODES.SIGN_OUT_OK,
            body: await AuthServices.signOut({
                userID: req.clientID,
            }),
        }).sendResponse(res);
    }

    /**
     * @desc Reset the token pari
     */
    static async refreshToken(req, res, next) {
        return new OK({
            message: 'Get the token pair successfully',
            body: await AuthServices.resetToken({
                userID: req.clientID,
            }),
            code: CODES.SUCCESS_TO_CREATE_TOKEN_PAIR,
        }).sendResponse(res);
    }
}

/* Export the controller */
module.exports = AuthController;
