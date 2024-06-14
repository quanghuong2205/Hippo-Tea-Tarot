'use strict';
const { Types } = require('mongoose');
const { unSelectProps, selectProps, getSkip } = require('../utils');
const ProductModel = require('../models/product.model');
const {
    convertToMultiFilterConditions,
    convertToRangeCondition,
} = require('../utils/mongoose.util');

/* Define the repo */
class ProductRepo {
    /**
     * @desc Create a new product based on the category
     * @returns
     */
    static async createProduct({ props }) {
        /**
         * Create product type
         */
        return await ProductModel.create(props);
    }

    /**
     * @desc Delete a product based on the ID
     */
    static async deleteProduct({
        productID,
        unselectedProps = [],
        selectedProps = [],
    }) {
        return await ProductModel.findOneAndDelete({
            _id: new Types.ObjectId(productID),
        })
            .select(unSelectProps(unselectedProps))
            .select(selectProps(selectedProps));
    }

    /**
     * @desc Update a product based on the ID
     */
    static async updateProduct({
        productID,
        updatedProps,
        unselectedProps = [],
        selectedProps = [],
    }) {
        return await ProductModel.findOneAndUpdate(
            {
                _id: new Types.ObjectId(productID),
            },
            updatedProps,
            {
                new: true,
            }
        )
            .select(unSelectProps(unselectedProps))
            .select(selectProps(selectedProps));
    }

    /**
     * @desc get all published products
     * @returns
     */
    static async getProductsByFilterParams({
        selectedProps = [],
        filterParams = {},
        page,
        limit,
        filters = { is_public: true, is_draft: false },
    }) {
        /* Get all products without filters */
        if (Object.keys(filterParams).length === 0) {
            return await ProductModel.aggregate([
                {
                    $facet: {
                        totalCount: [
                            {
                                $group: {
                                    _id: null,
                                    count: { $sum: 1 },
                                },
                            },
                        ],
                        data: [
                            { $skip: getSkip({ page, limit }) },
                            { $limit: limit },
                            { $project: selectProps(selectedProps) },
                        ],
                    },
                },
                {
                    $project: {
                        totalCount: {
                            $arrayElemAt: ['$totalCount.count', 0],
                        },
                        data: 1,
                    },
                },
            ]);
        }

        /* Get products based on filters */
        const pipeFilters = {
            ...filters,

            ...convertToMultiFilterConditions({
                key: 'category',
                valueString: filterParams['category'],
            }),

            ...convertToRangeCondition({
                key: 'price',
                minRange: filterParams['minPrice'],
                maxRange: filterParams['maxPrice'],
            }),

            ...convertToMultiFilterConditions({
                key: 'rating',
                valueString: filterParams['rating'],
                dataType: 'number',
            }),
        };

        return await ProductModel.aggregate([
            {
                $facet: {
                    totalCount: [
                        {
                            $match: pipeFilters,
                        },
                        {
                            $group: {
                                _id: null,
                                count: { $sum: 1 },
                            },
                        },
                    ],
                    data: [
                        { $match: pipeFilters },
                        { $skip: getSkip({ page, limit }) },
                        { $limit: limit },
                        { $project: selectProps(selectedProps) },
                    ],
                },
            },
            {
                $project: {
                    totalCount: { $arrayElemAt: ['$totalCount.count', 0] },
                    data: 1,
                },
            },
        ]);
    }

    /**
     * @desc get all published products by categry
     * @returns
     */
    static async getProductsByCategory({
        category,
        selectedProps = [],
        filters = {
            is_public: true,
            is_draft: false,
        },
    }) {
        return await ProductModel.aggregate([
            {
                $facet: {
                    totalCount: [
                        {
                            $match: { ...filters, category },
                        },
                        {
                            $group: {
                                _id: null,
                                count: { $sum: 1 },
                            },
                        },
                    ],
                    data: [
                        { $match: { ...filters, category } },
                        { $sort: { updatedAt: -1 } },
                        { $project: selectProps(selectedProps) },
                    ],
                },
            },

            {
                $project: {
                    totalCount: {
                        $arrayElemAt: ['$totalCount.count', 0],
                    },
                    data: 1,
                },
            },
        ]);
    }

    /**
     * @desc get a single products in detail
     *      based on id
     * @returns
     */
    static async getProduct({
        productID,
        filters = {
            is_public: true,
            is_draft: false,
        },
        unselectedProps = [],
        selectedProps = [],
    }) {
        const productObject = await ProductModel.findOne({
            _id: new Types.ObjectId(productID),
            ...filters,
        })
            .select(unSelectProps(unselectedProps))
            .select(selectProps(selectedProps))
            .lean();

        return productObject;
    }

    /**
     * @desc Update the rating score
     * @returns
     */
    static async updateRatingScore({
        productID,
        totalFeedbacksAfterModify,
        ratingScoreBeforeUpdate,
        ratingScore,
        queryType = 'add',
    }) {
        /* Find product */
        const productObject = await ProductModel.findOne({
            _id: new Types.ObjectId(productID),
        });

        const staleRatingScore = productObject.rating;

        /* A new feedback is added with the rating score */
        if (queryType === 'add') {
            if (totalFeedbacksAfterModify == 1) {
                productObject.rating = ratingScore;
                return await productObject.save();
            }

            const scoreBeforeAverage =
                staleRatingScore * (totalFeedbacksAfterModify - 1);
            const newAvgRatingScore =
                (scoreBeforeAverage + ratingScore) /
                totalFeedbacksAfterModify;

            productObject.rating = newAvgRatingScore;

            return await productObject.save();
        }

        /* A feedback is removed with rating score */
        if (queryType === 'delete') {
            if (totalFeedbacksAfterModify == 0) {
                productObject.rating = 0;
                return await productObject.save();
            }

            const scoreBeforeAverage =
                staleRatingScore * (totalFeedbacksAfterModify + 1);
            const newAvgRatingScore =
                (scoreBeforeAverage - ratingScore) /
                totalFeedbacksAfterModify;

            productObject.rating = newAvgRatingScore;

            return await productObject.save();
        }

        /* A feedback is updated with rating score */
        if (queryType === 'update') {
            if (totalFeedbacksAfterModify == 1) {
                productObject.rating = ratingScore;
                return await productObject.save();
            }

            const scoreBeforeAverage =
                staleRatingScore * totalFeedbacksAfterModify;
            const newAvgRatingScore =
                (scoreBeforeAverage -
                    ratingScoreBeforeUpdate +
                    ratingScore) /
                totalFeedbacksAfterModify;

            productObject.rating = newAvgRatingScore;

            return await productObject.save();
        }
    }
}

/* Export the repo */
module.exports = ProductRepo;
