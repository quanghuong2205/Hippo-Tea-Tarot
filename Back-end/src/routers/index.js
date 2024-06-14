'use strict';
const express = require('express');
const MainRouter = express.Router();

/* Base url */
const BASE_URL = '/api/v1';

/**
 * Sub-routers
 */
const AuthRouter = require('./auth.route');
const UserRouter = require('./user.route');
const ProductRouter = require('./product.route');
const SearchRouter = require('./search.route');
const FeedbackRouter = require('./feedback.route');
const CategoryRouter = require('./category.route');
const { NotMatchRouteError } = require('../utils/error.response.util');

/**
 * Main router
 */
MainRouter.use(`${BASE_URL}/auth`, AuthRouter);
MainRouter.use(`${BASE_URL}/user`, UserRouter);
MainRouter.use(`${BASE_URL}/product`, ProductRouter);
MainRouter.use(`${BASE_URL}/search`, SearchRouter);
MainRouter.use(`${BASE_URL}/feedback`, FeedbackRouter);
MainRouter.use(`${BASE_URL}/category`, CategoryRouter);

/**
 * Route not match
 */
MainRouter.use((req, res, next) =>
    next(
        new NotMatchRouteError({
            message: `The route [${req.originalUrl}] is not matched any`,
        })
    )
);

/* Init router handler */
const initRouters = (app) => app.use(MainRouter);

/**
 * Export init router handler
 */
module.exports = initRouters;
