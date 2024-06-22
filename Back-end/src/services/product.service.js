'use strict';
const CODES = require('../utils/code.http');
const ProductRepo = require('../repositories/product.repo');
const { BadRequestError } = require('../utils/error.response.util');
const { checkMongoID } = require('../utils/mongoose.util');
const FileServices = require('./file.service');
const {
    removeNullOrUndefinedProps,
    flattenObject,
    getPaginationInfor,
} = require('../utils');
const CommonRepo = require('../repositories/common.repo');
const MulterServices = require('./multer.service');

/**
 * Product service
 */
/* Define the service */
class ProductServices {
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

        const result = await ProductRepo.getProductsByFilterParams({
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

        /* Pagination information */
        const { nextPage, prevPage, totalPages } = getPaginationInfor({
            currentPage: parseInt(page),
            totalItems: result[0]?.totalCount,
            itemsPerPage: limit,
        });

        /* Query products */
        return {
            products: result[0].data,
            nextPage,
            prevPage,
            totalPages,
            currentPage: page,
        };
    }

    /**
     * @desc get all draft products
     * @returns all draft products
     */
    static async getDraftProducts({ filterParams, page = 1, limit = 50 }) {
        delete filterParams?.limit;
        delete filterParams?.page;

        /* Query products */
        const result = await ProductRepo.getProductsByFilterParams({
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
                is_draft: true,
                is_public: false,
            },
        });

        /* Pagination information */
        const { nextPage, prevPage, totalPages } = getPaginationInfor({
            currentPage: parseInt(page),
            totalItems: result[0]?.totalCount,
            itemsPerPage: limit,
        });

        /* Query products */
        return {
            products: result[0]?.data,
            nextPage,
            prevPage,
            totalPages,
        };
    }

    /**
     * @desc get a single product in detail
     * @returns a single product
     */
    static async getPublishedProduct({ productID }) {
        checkMongoID({
            id: productID,
            message: 'Invalid productID',
        });

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
        checkMongoID({
            id: productID,
            message: 'Invalid productID',
        });

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
    static async getPublishedProductsByCat({ category }) {
        /* Get category information */
        const categoryObject = await CommonRepo.findOne({
            filter: {
                category: category,
            },
            model: 'category',
            selectedProps: ['category', 'description'],
        });

        if (!categoryObject) {
            throw new BadRequestError({
                message: 'Invalid category',
                code: CODES.PRODUCT_INVALID_CATEGORY,
            });
        }

        /* Get products */
        const result = await ProductRepo.getProductsByCategory({
            category,
            selectedProps: [
                'name',
                'description',
                'price',
                'thumbs',
                'category',
                'rating',
            ],
        });

        /* Query products */
        return {
            products: result[0]?.data,
            category: categoryObject,
        };
    }

    /**
     * @desc Create a new product based on the category
     * @param {string} category product's category
     * @param {object} productProps properties of the product
     */
    static async createProduct({ productProps, fileObjects }) {
        /* Check category */
        const categoryObject = await CommonRepo.findOne({
            filter: {
                category: productProps.category,
            },
            model: 'category',
        });

        if (!categoryObject) {
            throw new BadRequestError({
                message: 'Invalid category',
                code: CODES.PRODUCT_INVALID_CATEGORY,
            });
        }

        const newThumbPaths = await FileServices.writeMultiFiles({
            fileObjects: fileObjects,
            type: 'product',
        });

        /* Create product */
        return await ProductRepo.createProduct({
            props: {
                ...productProps,
                thumbs: newThumbPaths ? newThumbPaths : [],
            },
        });
    }

    /**
     * @desc Delete a product based on the product id
     */
    static async updateProduct({ productID, productProps, fileObjects }) {
        checkMongoID({
            id: productID,
            message: 'Invalid productID',
        });

        /* Check if the product existed */
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

        /* Check category type */
        if (productProps?.category) {
            const categoryObject = await CommonRepo.findOne({
                filter: {
                    category: productProps.category,
                },
                model: 'category',
            });

            if (!categoryObject) {
                throw new BadRequestError({
                    message: 'Invalid category',
                    code: CODES.PRODUCT_INVALID_CATEGORY,
                });
            }
        }

        /* Store new files */
        const newThumbPaths = await FileServices.writeMultiFiles({
            fileObjects: fileObjects,
            type: 'product',
        });

        /* Unlink stale products's files */
        const productFilePaths = productObject.thumbs;

        /* Remain file field in multipart form could be
            string, empty string, or array of string
        */
        const remainedFilePaths =
            typeof productProps.remain_thumbs === 'string'
                ? [
                      ...(productProps.remain_thumbs !== ''
                          ? [productProps.remain_thumbs]
                          : []),
                  ]
                : productProps.remain_thumbs;

        const removedFilePaths =
            remainedFilePaths.length === 0
                ? productFilePaths
                : productFilePaths.filter(
                      (t) => !remainedFilePaths.includes(t)
                  );

        await FileServices.removeMultiFiles({
            relativePaths: removedFilePaths,
        });

        /* Remove undefined props and flatten the updated object */
        removeNullOrUndefinedProps({ productProps });
        productProps = flattenObject({ prefix: null, obj: productProps });

        return await ProductRepo.updateProduct({
            productID,
            updatedProps: {
                ...productProps,
                thumbs: [...newThumbPaths, ...remainedFilePaths],
            },
            unselectedProps: ['__v'],
        });
    }

    /**
     * @desc Delete a product based on the product id
     */
    static async deleteProduct({ productID }) {
        checkMongoID({
            id: productID,
            message: 'Invalid productID',
        });

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
            unselectedProps: ['__v'],
        });
    }
}

/**
 * Export service
 */
module.exports = ProductServices;
