'use strict';
const express = require('express');
const AuthRouter = express.Router();
const AuthController = require('../controllers/auth.controller');

/**
 * Middlewares
 */
const { errorCatcher } = require('../middlewares/error.middle');
const {
    verifyClientID,
    verifyAccessToken,
    verifyRefreshToken,
} = require('../middlewares/auth.middle');

/**
 * USER ROUTES
 */

/* [POST] [/auth/signin] */
AuthRouter.post('/signin', errorCatcher(AuthController.signIn));

/* [POST] [/auth/signup] */
AuthRouter.post('/signup', errorCatcher(AuthController.signUp));

AuthRouter.use(errorCatcher(verifyClientID));

/* [POST] [/auth/refresh-token] */
AuthRouter.post(
    '/refresh-token',
    errorCatcher(verifyRefreshToken),
    errorCatcher(AuthController.refreshToken)
);

AuthRouter.use(errorCatcher(verifyAccessToken));

/* [POST] [/auth/signout] */
AuthRouter.post('/signout', errorCatcher(AuthController.signOut));

/* Export the router */
module.exports = AuthRouter;
