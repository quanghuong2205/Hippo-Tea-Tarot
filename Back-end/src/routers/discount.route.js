'use strict';
const express = require('express');
const DiscountRouter = express.Router();
const DiscountController = require('../controllers/discount.controller');

/**
 * RBAC
 */
const RBAC = require('../cores/Role-based-access-controll');
const rbac = new RBAC();
rbac.setGrants({ permissionType: 'discount' });

/**
 * Middlewares
 */
const ErrorHandler = require('../utils/error.hanlder');
const { verifyClientID } = require('../middlewares/auth');
const { verifyGrant } = require('../middlewares/access-controll');
const grantVerifier = verifyGrant({ rbac });

/**
 * USER ROUTES
 */
/* [GET] [/discount/detail]?code= */
DiscountRouter.get(
    '/detail',
    grantVerifier({ resource: 'discounts', action: 'readAny' }),
    ErrorHandler(DiscountController.getDiscountDetail)
);

DiscountRouter.use(ErrorHandler(verifyClientID));

/* [POST] [/discount/for-order] */
DiscountRouter.post(
    '/for-order',
    grantVerifier({ resource: 'discounts', action: 'readDiscountAmount' }),
    ErrorHandler(DiscountController.getDiscountsForOrder)
);

/* [post] [/discount/amount] */
DiscountRouter.post(
    '/amount',
    grantVerifier({
        resource: 'discounts',
        action: 'applyDiscountAmount',
    }),
    ErrorHandler(DiscountController.applyDiscountToOrder)
);

/**
 * ADMIN ROUTES
 */

/* [POST] [/discount] */
DiscountRouter.post(
    '/',
    grantVerifier({ resource: 'discounts', action: 'createAny' }),
    ErrorHandler(DiscountController.createDiscount)
);

/* [PATCH] [/discount] */
DiscountRouter.patch(
    '/',
    grantVerifier({ resource: 'discounts', action: 'updateAny' }),
    ErrorHandler(DiscountController.updateDiscount)
);

/* [DELETE] [/discount] */
DiscountRouter.delete(
    '/',
    grantVerifier({ resource: 'discounts', action: 'deleteAny' }),
    ErrorHandler(DiscountController.deleteDiscount)
);

/* Export the router */
module.exports = DiscountRouter;
