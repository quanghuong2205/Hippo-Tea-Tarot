'use strict';
const express = require('express');
const SearchRouter = express.Router();

/**
 * Middlewares
 */
const ErrorHandler = require('../utils/error.hanlder');
const SearchRepo = require('../repositories/search.repo');

/**
 * Main routes
 */

/* [GET] */

/* [POST] */
SearchRouter.get('/', async (req, res, next) => {
    res.json(
        await SearchRepo.searchProducts({
            searchPhrase: req.body.searchPhrase,
        })
    );
});

/* [DELETE] */

/* [PUT] */

/* [PATCH] */

/* Export the router */
module.exports = SearchRouter;
