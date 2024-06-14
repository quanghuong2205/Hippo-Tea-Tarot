'use strict';
const express = require('express');
const CategoryRouter = express.Router();

/**
 * Middlewares
 */
const ErrorHandler = require('../utils/error.hanlder');
const CommonRepo = require('../repositories/common.repo');

/**
 * Main routes
 */

/* [POST] [/category] */

CategoryRouter.post('/', async (req, res, next) => {
    res.json({
        body: await CommonRepo.createOne({
            model: 'category',
            props: {
                category: req.body.category,
                description: req.body.description,
            },
        }),
    });
});

/* Export the router */
module.exports = CategoryRouter;
