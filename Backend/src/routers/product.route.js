'use strict';
const express = require('express');
const ProductRouter = express.Router();
const ProductController = require('../controllers/product.controller');

/**
 * Middlewares
 */
const { errorCatcher } = require('../middlewares/error.middle');
const { verifyClientID } = require('../middlewares/auth.middle');

/**
 * USER ROUTES
 */

/* [GET] [/product/publish] */
ProductRouter.get(
    '/publish',
    errorCatcher(ProductController.getPublishedProducts)
);

/* [/product/publish/:id] */
ProductRouter.get(
    '/publish/:id',
    errorCatcher(ProductController.getPublishedProduct)
);

/* [GET] [/product/category/:cat] */
ProductRouter.get(
    '/publish/category/:cat',
    errorCatcher(ProductController.getPublishedProductsByCat)
);

/**
 * ADMIN ROUTES
 */

ProductRouter.use(errorCatcher(verifyClientID));
/* [GET] [/product/draft] */
ProductRouter.get(
    '/draft',
    errorCatcher(ProductController.getDraftProducts)
);

/* [/product/draft/:id] */
ProductRouter.get(
    '/draft/:id',
    errorCatcher(ProductController.getDraftProduct)
);

/* [POST] [/product] */
ProductRouter.post('/', errorCatcher(ProductController.createProduct));

/* [DELETE] [/product/:id] */
ProductRouter.delete(
    '/:id',
    errorCatcher(ProductController.deleteProduct)
);

/* [PATCH] [/product/:id] */
ProductRouter.patch('/:id', errorCatcher(ProductController.updateProduct));

/* Export the router */
module.exports = ProductRouter;
