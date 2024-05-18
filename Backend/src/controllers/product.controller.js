'use strict';
const { OK, CREATED } = require('../helpers/success.res.helper');
const CODES = require('../utils/code.http');
const ProductServices = require('../services/product.service');
const { BadRequestError } = require('../helpers/success.res.helper');
const MulterServices = require('../services/multer.service');

/* Define the controller */
class ProductController {
    /**
     * @route [POST] /product
     */
    static async createProduct(req, res, next) {
        const relativePaths = await MulterServices.uploadMany({
            req,
            res,
            context: 'product',
        });

        const body = await ProductServices.createProduct({
            category: req.body.category,
            productProps: req.body,
            req,
            relativePaths,
        });

        return new CREATED({
            message: 'Created the product successfully',
            body,
        }).sendResponse(res);
    }

    /**
     * @route [DELETE] /product/:id
     */
    static async deleteProduct(req, res, next) {
        const body = await ProductServices.deleteProduct({
            productID: req.params.id,
        });

        return new OK({
            message: 'Deleted the product successfully',
            body,
            code: CODES.OK,
        }).sendResponse(res);
    }

    /**
     * @route [PATCH] /product/:id
     */
    static async updateProduct(req, res, next) {
        if (!req.params?.id) {
            throw new BadRequestError({
                message: 'Not provide the id of the product',
                code: CODES.PRODUCT_MISS_ID,
            });
        }

        /* Upload product's thumbs */
        const relativePaths = await MulterServices.uploadMany({
            req,
            res,
            context: 'product',
        });

        const body = await ProductServices.updateProduct({
            productID: req.params.id,
            relativePaths,
            productProps: req.body,
        });

        return new OK({
            message: 'Updated the product successfully',
            body,
            code: CODES.OK,
        }).sendResponse(res);
    }

    /**
     * @route [GET] /product/publish
     * @returns
     */
    static async getPublishedProducts(req, res, next) {
        const body = await ProductServices.getPublishedProducts({
            filterParams: req.query,
            page: req.query?.page,
            limit: req.query?.limit,
        });

        return new OK({
            message: 'Got all published products successfully',
            body: body,
            code: CODES.OK,
        }).sendResponse(res);
    }

    /**
     * @route [GET] /product/draft
     * @returns
     */
    static async getDraftProducts(req, res, next) {
        const body = await ProductServices.getDraftProducts({
            filterParams: req.query,
            page: req.query?.page,
            limit: req.query?.limit,
        });

        return new OK({
            message: 'Got all draft products successfully',
            body: body,
            code: CODES.OK,
        }).sendResponse(res);
    }

    /**
     * @route [GET] /product/category/
     * @returns
     */
    static async getPublishedProductsByCat(req, res, next) {
        if (!req.params?.cat) {
            throw new BadRequestError({
                message: 'Not provide the category of products',
            });
        }

        const body = await ProductServices.getPublishedProductsByCat({
            category: req.params.cat,
        });

        return new OK({
            message: 'Got all products by category successfully',
            body,
            code: CODES.OK,
        }).sendResponse(res);
    }

    /**
     * @route [GET] /product/:id
     */
    static async getPublishedProduct(req, res, next) {
        if (!req.params?.id) {
            throw new BadRequestError({
                message: 'Not provide the id of the product',
                code: CODES.PRODUCT_MISS_ID,
            });
        }

        const body = await ProductServices.getPublishedProduct({
            productID: req.params.id,
        });

        return new OK({
            message: 'Got the product successfully',
            body,
            code: CODES.OK,
        }).sendResponse(res);
    }

    /**
     * @route [GET] /product/:id
     */
    static async getDraftProduct(req, res, next) {
        if (!req.params?.id) {
            throw new BadRequestError({
                message: 'Not provide the id of the product',
                code: CODES.PRODUCT_MISS_ID,
            });
        }

        const body = await ProductServices.getDrafProduct({
            productID: req.params.id,
        });

        return new OK({
            message: 'Got the product successfully',
            body,
            code: CODES.OK,
        }).sendResponse(res);
    }
}

/* Export the controller */
module.exports = ProductController;
