'use strict';
const express = require('express');
const AuthRouter = express.Router();
const AuthController = require('../controllers/auth.controller');

/**
 * USER ROUTES
 */

/* [POST] [/auth/signin] */
AuthRouter.post('/signin', AuthController.signIn);

/* [POST] [/auth/signup] */
AuthRouter.post('/signup', AuthController.signUp);

/* Export the router */
module.exports = AuthRouter;
