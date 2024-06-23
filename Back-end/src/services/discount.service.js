'use strict';
const CommonRepo = require('../repositories/common.repo');
const DiscountRepo = require('../repositories/discount.repo');
const ProductRepo = require('../repositories/product.repo');
const { flattenObject, removeNullOrUndefinedProps } = require('../utils');
const CODES = require('../utils/code.http');
const { BadRequestError } = require('../utils/error.response.util');

/**
 * Product service
 */
/* Define the service */
class DiscountServices {
    /**
     * @desc get the information of the discount based on code
     * @returns the discount
     */
    static async getDiscountDetail({ discountCode }) {
        /* 1. Ensure the discount existed */
        const discountObject =
            await DiscountRepo.ensureAndGetExistingDiscount({
                code: discountCode,
                unselectedProps: ['__v'],
            });

        /* 2.Ensure discount is valid */
        await DiscountRepo.ensureValidDiscount({
            code: discountCode,
            discount: discountObject,
            criteria: { active: true },
        });

        /* Return the discount */
        return discountObject;
    }

    /**
     * @desc get discounts which applied to a group of products
     * @returns discounts
     */
    static async getDiscountsForOrder({ products }) {
        /* 1. Ensure products in order are all valid */
        const productObjects = [];
        for (let i = 0; i < products.length; i++) {
            const productObject = await ProductRepo.getProduct({
                productID: products[i].id,
                selectedProps: ['category', 'attributes', 'price'],
            });

            if (!productObject) {
                throw new BadRequestError({
                    code: CODES.PRODUCT_NOT_EXIST,
                    message: 'Can not verify product in order',
                });
            }

            productObjects.push({
                ...productObject,
                ...products[i],
            });
        }

        console.log(productObjects);

        /* 2. Get all valid discounts */
        const discountObjects = await DiscountRepo.getValidDiscounts({
            unselectedProps: ['__v', 'is_active'],
        });

        if (discountObjects.length === 0) {
            return [];
        }

        /* 3. Check apply-criteria of each discount for each product in order */
        /* Variable to store the returned result */
        const result = [];

        discountObjects.forEach((discountObject) => {
            const criteria = discountObject.apply_criteria;
            const isAppliable = this.checkDiscountCriteriaForProduct({
                criteriaArray: criteria,
                productObjects,
            });

            result.push({
                discount: discountObject,
                is_appliable: isAppliable,
            });
        });

        return result;
    }

    /**
     * @desc apply the discount to the order
     * @returns discounts
     */
    static async applyDiscountToOrder({ discountCode, products, userID }) {
        /* 1. Ensure the discount existed */
        const discountObject =
            await DiscountRepo.ensureAndGetExistingDiscount({
                code: discountCode,
            });

        /* 2. Ensure the discount is valid */
        await DiscountRepo.ensureValidDiscount({
            code: discountCode,
            userID,
            criteria: {
                active: true,
                notExpire: true,
                availabelSlots: true,
                availableSlotsForUser: true,
            },
        });

        /* 3. Ensure products in order are all valid */
        const productObjects = [];
        for (let i = 0; i < products.length; i++) {
            const productObject = await ProductRepo.getProduct({
                productID: products[i].id,
                selectedProps: ['category', 'attributes', 'price'],
            });

            if (!productObject) {
                throw new BadRequestError({
                    code: CODES.PRODUCT_NOT_EXIST,
                    message: 'Can not verify product in order',
                });
            }

            productObjects.push({
                ...productObject,
                ...products[i],
            });
        }

        /* 4. Check apply-criteria of the discount for each product in order */
        const criteria = discountObject.apply_criteria;
        const isAppliable = this.checkDiscountCriteriaForProduct({
            criteriaArray: criteria,
            productObjects,
        });

        if (!isAppliable) {
            throw new BadRequestError({
                code: CODES.DISCOUNT_CRITERIA_NOT_MEET,
                message: 'The product not meet criterias of the discount',
            });
        }

        /* 5. Calculate the result after applying the discount */
        const type = discountObject.type;
        const value = discountObject.value;
        const max = discountObject.max_value_limit;

        /* 5.1. Sum of price of the order */
        const originalPrice = productObjects.reduce((prev, cur) => {
            return prev + cur.price * cur.quantity;
        }, 0);

        /* 5.2. Discount amount */
        let discountAmount =
            type === 'percentage' ? (originalPrice * value) / 100 : value;
        discountAmount = discountAmount < max ? discountAmount : max;

        /* 5.3. Total price after applying the discount */
        let discountedPrice =
            originalPrice - discountAmount > 0
                ? originalPrice - discountAmount
                : 0;

        /* 6. Return the discount result */
        return {
            originalPrice,
            discountAmount,
            maxDiscountAmount: max,
            discountedPrice,
        };
    }
    /**
     * @desc create a new discount
     * @returns created discount
     */
    static async createDiscount({ discountProps }) {
        /* 1. Ensure the discount not existed */
        await DiscountRepo.ensureDiscountNotExist({
            code: discountProps.code,
        });

        /* Check the time of discount */
        if (Date.now() > new Date(discountProps.end_time)) {
            throw new BadRequestError({
                code: CODES.DISCOUNT_INVALID_END_TIME,
                message: 'Discount end-time invalid',
            });
        }

        if (
            new Date(discountProps.start_time) >
            new Date(discountProps.end_time)
        ) {
            throw new BadRequestError({
                code: CODES.DISCOUNT_INVALID_START_TIME,
                message: 'Discount start-time invalid',
            });
        }

        return await CommonRepo.createOne({
            model: 'discount',
            props: discountProps,
        });
    }

    /**
     * @desc update the discount based on code
     * @returns updated discount
     */
    static async updateDiscount({ discountCode, discountProps }) {
        /* 1. Ensure the discount existed */
        const discountObject =
            await DiscountRepo.ensureAndGetExistingDiscount({
                code: discountCode,
            });

        /* 2. Remove undefined or null prop */
        removeNullOrUndefinedProps(discountProps);

        /* 3. Updated the discount */
        return await CommonRepo.updateOne({
            model: 'discount',
            filter: { code: discountCode },
            updatedProps: discountProps,
            unselectedProps: ['__v'],
        });
    }

    /**
     * @desc delete the discount based on code
     * @returns deleted discount
     */
    static async deleteDiscount({ discountCode }) {
        /* 1. Ensure the discount existed */
        await DiscountRepo.ensureAndGetExistingDiscount({
            code: discountCode,
        });

        return await CommonRepo.deleteOne({
            filter: {
                code: discountCode,
            },
        });
    }

    /**
     * @desc check discount criteria for each product
     * @returns boolean
     */
    static checkDiscountCriteriaForProduct({
        criteriaArray = [],
        productObjects = [],
    }) {
        for (let i = 0; i < criteriaArray.length; i++) {
            const { type, value } = criteriaArray[i];
            if (type === 'category') {
                const productWithDiffCat = productObjects.find(
                    (p) => p.category !== value
                );
                if (productWithDiffCat) return false;
            }

            if (type === 'threshold_per_product') {
                const productWithLowerPrice = productObjects.find(
                    (p) => p.price * p.quantity < value
                );
                if (productWithLowerPrice) return false;
            }

            if (type === 'threshold_total_amount') {
                const totalPrice = productObjects.reduce(
                    (prev, cur) => prev + cur.price * cur.quantity,
                    0
                );
                if (totalPrice < value) return false;
            }

            if (type === 'group_products') {
                const productNotInGroup = productObjects.find(
                    (p) => !value.includes(p._id)
                );
                if (productNotInGroup) return false;
            }
        }

        return true;
    }
}

/**
 * Export service
 */
module.exports = DiscountServices;
