'use strict';
const { OK, CREATED } = require('../utils/success.response.util');
const CODES = require('../utils/code.http');
const ProductServices = require('../services/product.service');
const { BadRequestError } = require('../utils/error.response.util');
const MulterServices = require('../services/multer.service');
const DiscountServices = require('../services/discount.service');

/* Define the controller */
class DiscountController {
    /**
     * @route [GET] /discount/detail
     */
    static async getDiscountDetail(req, res, next) {
        if (!req.query?.code) {
            throw new BadRequestError({
                code: CODES.DISCOUNT_MISS_CODE,
                message: 'Miss discount code to get detail',
            });
        }

        return new OK({
            message: 'Got the discount in detail successfully',
            body: await DiscountServices.getDiscountDetail({
                discountCode: req.query.code,
            }),
            code: CODES.OK,
        }).sendResponse(res);
    }

    /**
     * @route [POST] /discount/for-order
     */
    static async getDiscountsForOrder(req, res, next) {
        if (!req.body?.products.length) {
            throw new BadRequestError({
                code: CODES.DISCOUNT_NOT_FIND_FOR_EMPTY_ORDER,
                message: 'Not get discounts for empty order',
            });
        }

        return new OK({
            message: 'Got all discounts for order successfully',
            body: await DiscountServices.getDiscountsForOrder({
                products: req.body.products,
            }),
            code: CODES.OK,
        }).sendResponse(res);
    }

    /**
     * @route [POST] /discount/amount
     */
    static async applyDiscountToOrder(req, res, next) {
        if (!req.body?.products.length) {
            throw new BadRequestError({
                code: CODES.DISCOUNT_NOT_FIND_FOR_EMPTY_ORDER,
                message: 'Not get discounts for empty order',
            });
        }

        return new OK({
            message: 'Applied the discount to the order successfully',
            body: await DiscountServices.applyDiscountToOrder({
                discountCode: req.body.code,
                products: req.body.products,
                userID: req.clientID || '666a9158a75451f80706c844',
            }),
            code: CODES.OK,
        }).sendResponse(res);
    }

    /**
     * @route [POST] /discount
     */
    static async createDiscount(req, res, next) {
        return new OK({
            message: 'Created the discount successfully',
            body: await DiscountServices.createDiscount({
                discountProps: req.body,
            }),
            code: CODES.OK,
        }).sendResponse(res);
    }

    /**
     * @route [PATCH] /discount
     */
    static async updateDiscount(req, res, next) {
        if (!req.query?.code) {
            throw new BadRequestError({
                code: CODES.DISCOUNT_MISS_CODE,
                message: 'Miss discount code',
            });
        }

        return new OK({
            message: 'Updated the discount successfully',
            body: await DiscountServices.updateDiscount({
                discountCode: req.query.code,
                discountProps: req.body,
            }),
            code: CODES.OK,
        }).sendResponse(res);
    }

    /**
     * @route [DELETE] /discount
     */
    static async deleteDiscount(req, res, next) {
        if (!req.query?.code) {
            throw new BadRequestError({
                code: CODES.DISCOUNT_MISS_CODE,
                message: 'Miss discount code',
            });
        }

        return new OK({
            message: 'Deleted the discount successfully',
            body: await DiscountServices.deleteDiscount({
                discountCode: req.query.code,
            }),
            code: CODES.OK,
        }).sendResponse(res);
    }
}

/* Export the controller */
module.exports = DiscountController;
