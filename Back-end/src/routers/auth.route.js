'use strict';
const express = require('express');
const AuthRouter = express.Router();
const AuthController = require('../controllers/auth.controller');

/**
 * Middlewares
 */
const ErrorHandler = require('../utils/error.hanlder');
const {
    verifyClientID,
    verifyAccessToken,
    verifyRefreshToken,
} = require('../middlewares/auth');

/**
 * USER ROUTES
 */

/* [POST] [/auth/signin] */
AuthRouter.post('/signin', ErrorHandler(AuthController.signIn));

/* [POST] [/auth/signup] */
AuthRouter.post('/signup', ErrorHandler(AuthController.signUp));

AuthRouter.use(ErrorHandler(verifyClientID));

/* [POST] [/auth/refresh-token] */
AuthRouter.post(
    '/refresh-token',
    ErrorHandler(verifyRefreshToken),
    ErrorHandler(AuthController.refreshToken)
);

AuthRouter.use(ErrorHandler(verifyAccessToken));

/* [POST] [/auth/signout] */
AuthRouter.post('/signout', ErrorHandler(AuthController.signOut));

/**
 * ADMIN ROUTES
 */

/* Export the router */
module.exports = AuthRouter;
