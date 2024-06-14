'use strict';
const express = require('express');
const UserRouter = express.Router();
const UserController = require('../controllers/user.controller');

/**
 * Middlewares
 */
const ErrorHandler = require('../utils/error.hanlder');
const {
    verifyClientID,
    verifyAccessToken,
} = require('../middlewares/auth');
UserRouter.use(ErrorHandler(verifyClientID));
UserRouter.use(ErrorHandler(verifyAccessToken));

/**
 * Main routes
 */

/* [POST] [/user/avatar] */
UserRouter.post('/avatar', UserController.uploadAvatar);

/* Export the router */
module.exports = UserRouter;
