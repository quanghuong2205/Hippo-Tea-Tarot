'use strict';
const express = require('express');
const AuthRouter = express.Router();
const AuthController = require('../controllers/auth.controller');

/**
 * Middlewares
 */
const { errorCatcher } = require('../middlewares/error');

/**
 * USER ROUTES
 */

/* [POST] [/auth/signin] */
AuthRouter.post('/signin', errorCatcher(AuthController.signIn));

/* [POST] [/auth/signup] */
AuthRouter.post('/signup', errorCatcher(AuthController.signUp));

/* Export the router */
module.exports = AuthRouter;
