'use strict';

const AuthServices = require('../services/auth.service');
const { OK } = require('../helpers/success.res.helper');
const CODES = require('../helpers/error.res.helper');

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

    /**
     *
     * @desc Logout the account
     */
    static async signOut(req, res, next) {
        const body = await AuthServices.signOut({
            userID: req.clientID,
        });

        return new OK({
            message: 'Sign out successfully',
            code: CODES.SIGN_OUT_OK,
            body,
        }).sendResponse(res);
    }

    /**
     * @desc Reset the token pari
     */
    static async refreshToken(req, res, next) {
        const body = await AuthServices.resetToken({
            userID: req.clientID,
        });

        return new OK({
            message: 'Get the token pair successfully',
            body,
            code: CODES.JWT_SUCCESS_TO_CREATE_TOKEN_PAIR,
        }).sendResponse(res);
    }
}

/* Export the controller */
module.exports = AuthController;
