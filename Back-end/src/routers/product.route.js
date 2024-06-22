'use strict';
const express = require('express');
const ProductRouter = express.Router();
const ProductController = require('../controllers/product.controller');

/**
 * RBAC
 */
const RBAC = require('../cores/Role-based-access-controll');
const rbac = new RBAC();
rbac.setGrants({ permissionType: 'product' });

/**
 * Middlewares
 */
const ErrorHandler = require('../utils/error.hanlder');
const { verifyClientID } = require('../middlewares/auth');
const { verifyGrant } = require('../middlewares/access-controll');
const { multipartFormParserMiddleware } = require('../middlewares/multer');
const grantVerifier = verifyGrant({ rbac });

/**
 * USER ROUTES
 */

/* [GET] [/product/publish] */
ProductRouter.get(
    '/publish',
    ErrorHandler(ProductController.getPublishedProducts)
);

/* [/product/publish/:id] */
ProductRouter.get(
    '/publish/:id',
    ErrorHandler(ProductController.getPublishedProduct)
);

/* [GET] [/product/category/:cat] */
ProductRouter.get(
    '/publish/category/:cat',
    ErrorHandler(ProductController.getPublishedProductsByCat)
);

/**
 * ADMIN ROUTES
 */
ProductRouter.use(ErrorHandler(verifyClientID));

/* [GET] [/product/draft] */
ProductRouter.get(
    '/draft',
    grantVerifier({ resource: 'draft products', action: 'readAny' }),
    ErrorHandler(ProductController.getDraftProducts)
);

/* [/product/draft/:id] */
ProductRouter.get(
    '/draft/:id',
    grantVerifier({ resource: 'draft products', action: 'readAny' }),
    ErrorHandler(ProductController.getDraftProduct)
);

/* [POST] [/product] */
ProductRouter.post(
    '/',
    grantVerifier({ resource: 'products', action: 'createAny' }),
    multipartFormParserMiddleware,
    ErrorHandler(ProductController.createProduct)
);

/* [PATCH] [/product?pid=] */
ProductRouter.patch(
    '/',
    grantVerifier({ resource: 'products', action: 'updateAny' }),
    multipartFormParserMiddleware,
    ErrorHandler(ProductController.updateProduct)
);

/* [DELETE] [/product?pid=] */
ProductRouter.delete(
    '/',
    grantVerifier({ resource: 'products', action: 'deleteAny' }),
    ErrorHandler(ProductController.deleteProduct)
);

/* Export the router */
module.exports = ProductRouter;
