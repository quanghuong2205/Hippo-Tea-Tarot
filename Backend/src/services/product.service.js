'use strict';
const CODES = require('../utils/code.http');
const ProductRepo = require('../repositories/product.repo');
const { BadRequestError } = require('../helpers/error.res.helper');
const { checkID } = require('../utils/mongoose.util');
const FileServices = require('./file.service');
const { removeNullOrUndefinedProps, flattenObject } = require('../utils');

/**
 * Product service
 */
/* Define the service */
class ProductServices {
    /**
     * Private routes (for admin)
     */

    /**
     * @desc Create a new product based on the category
     * @param {string} category product's category
     * @param {object} productProps properties of the product
     */
    static async createProduct({ category, productProps, relativePaths }) {
        if (!category) {
            throw new BadRequestError({
                message: 'Provide the product category',
                code: CODES.MISTT_PRODUCT_CATEGORY,
            });
        }

        if (!relativePaths) {
            return await ProductRepo.createProduct({
                props: {
                    ...productProps,
                },
            });
        }

        /* Create product */
        return await ProductRepo.createProduct({
            props: {
                ...productProps,
                thumbs: relativePaths,
            },
        });
    }

    /**
     * @desc Delete a product based on the product id
     */
    static async deleteProduct({ productID }) {
        if (!checkID({ id: productID })) {
            throw new BadRequestError({
                message: 'Invalid productID',
                code: CODES.INVALID_PRODUCT_ID,
            });
        }

        /* Find product in the database */
        const productObject = await ProductRepo.getProduct({
            productID,
            filters: {},
        });

        if (!productObject) {
            throw new BadRequestError({
                message: 'Product not exist',
                code: CODES.PRODUCT_NOT_EXIST,
            });
        }

        /* Unlink product files */
        const productThumbs = productObject?.thumbs;
        if (productThumbs) {
            await FileServices.removeMultiFiles({
                relativePaths: productThumbs,
            });
        }

        /* Delete the products */
        return await ProductRepo.deleteProduct({
            productID,
            unselectedProps: ['__v', 'thumbs'],
        });
    }

    /**
     * @desc Delete a product based on the product id
     */
    static async updateProduct({
        productID,
        productProps,
        relativePaths,
    }) {
        if (!checkID({ id: productID })) {
            throw new BadRequestError({
                message: 'Invalid productID',
                code: CODES.INVALID_PRODUCT_ID,
            });
        }

        /* Find product in the database */
        const productObject = await ProductRepo.getProduct({
            productID,
            filters: {},
        });

        if (!productObject) {
            throw new BadRequestError({
                message: 'Product not exist',
                code: CODES.PRODUCT_NOT_EXIST,
            });
        }

        /* Unlink stale products's thumbs */
        const productThumbs = productObject?.thumbs;
        if (productThumbs) {
            await FileServices.removeMultiFiles({
                relativePaths: productThumbs,
            });
        }

        /* Remove undefined props and flatten the updated object */
        removeNullOrUndefinedProps({ productProps });
        productProps = flattenObject({ prefix: null, obj: productProps });

        /* Update the products */
        if (!relativePaths) {
            return await ProductRepo.updateProduct({
                productID,
                updatedProps: productProps,
            });
        }

        return await ProductRepo.updateProduct({
            productID,
            updatedProps: {
                ...productProps,
                thumbs: relativePaths,
            },
            unselectedProps: ['__v'],
        });
    }

    /**
     * Public route (for user)
     */

    /**
     * @desc get all published products
     * @returns all published products
     */
    static async getPublishedProducts({
        filterParams,
        page = 0,
        limit = 50,
    }) {
        delete filterParams?.limit;
        delete filterParams?.page;

        /* Query products */
        return await ProductRepo.getProductsByFilterParams({
            selectedProps: [
                'name',
                'description',
                'price',
                'thumbs',
                'category',
                'rating',
            ],
            filterParams,
            page: parseInt(page),
            limit: parseInt(limit),
        });
    }

    /**
     * @desc get all draft products
     * @returns all draft products
     */
    static async getDraftProducts({ filterParams, page = 0, limit = 50 }) {
        delete filterParams?.limit;
        delete filterParams?.page;

        /* Query products */
        return await ProductRepo.getProductsByFilterParams({
            selectedProps: [
                'name',
                'description',
                'price',
                'thumbs',
                'category',
                'rating',
            ],
            filterParams,
            page: parseInt(page),
            limit: parseInt(limit),
            filters: {
                is_public: false,
                is_draft: true,
            },
        });
    }

    /**
     * @desc get a single product in detail
     * @returns a single product
     */
    static async getPublishedProduct({ productID }) {
        if (!checkID({ id: productID })) {
            throw new BadRequestError({
                message: 'Invalid productID',
                code: CODES.MONGODB_INVALID_ID,
            });
        }

        /* Get published product */
        const productObject = await ProductRepo.getProduct({
            productID,
            unselectedProps: ['__v'],
        });

        if (!productObject) {
            throw new BadRequestError({
                message: 'Product not exist',
                code: CODES.PRODUCT_NOT_EXIST,
            });
        }

        return productObject;
    }

    /**
     * @desc get a single product in detail
     * @returns a single product
     */
    static async getDrafProduct({ productID }) {
        if (!checkID({ id: productID })) {
            throw new BadRequestError({
                message: 'Invalid productID',
                code: CODES.MONGODB_INVALID_ID,
            });
        }

        /* Get published product */
        const productObject = await ProductRepo.getProduct({
            productID,
            unselectedProps: ['__v'],
            filters: {
                is_public: false,
                is_draft: true,
            },
        });

        if (!productObject) {
            throw new BadRequestError({
                message: 'Product not exist',
                code: CODES.PRODUCT_NOT_EXIST,
            });
        }

        return productObject;
    }

    /**
     * @desc get all products by category
     * @returns all products by target category
     */
    static async getPublishedProductsByCat({ category, limit, page }) {
        return await ProductRepo.getProductsByCategory({
            category,
            limit,
            page,
        });
    }
}

/**
 * Export service
 */
module.exports = ProductServices;
