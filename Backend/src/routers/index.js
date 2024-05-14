'use strict';
const express = require('express');
const MainRouter = express.Router();

/* Base url */
const BASE_URL = '/api/v1';

/**
 * Sub-routers
 */
const AuthRouter = require('./auth.route');

/**
 * Main router
 */
MainRouter.use(`${BASE_URL}/auth`, AuthRouter);

/* Init router handler */
const initRouters = (app) => app.use(MainRouter);

/**
 * Export init router handler
 */
module.exports = initRouters;
