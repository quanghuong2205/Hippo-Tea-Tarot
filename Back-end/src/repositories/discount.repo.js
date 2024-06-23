'use strict';
const { Types } = require('mongoose');
const MODELS = require('../models');
const {
    unSelectProps,
    selectProps,
    isBelowFrequencyLimit,
} = require('../utils');
const discountModel = require('../models/discount.model');
const CODES = require('../utils/code.http');
const { ConflictError } = require('../utils/error.response.util');

/* Define the repo */
class DiscountRepo {
    static async ensureAndGetExistingDiscount({
        code,
        selectedProps = [],
        unselectedProps = [],
    }) {
        const existedDiscount = await discountModel
            .findOne({
                code,
            })
            .select(unSelectProps(unselectedProps))
            .select(selectProps(selectedProps))
            .lean();

        if (!existedDiscount) {
            throw new ConflictError({
                code: CODES.DISCOUNT_NOT_EXISTED,
                message: 'The discount not existed',
            });
        }

        return existedDiscount;
    }

    static async ensureDiscountNotExist({ code }) {
        const existedDiscount = await discountModel.findOne({
            code,
        });

        if (existedDiscount) {
            throw new ConflictError({
                code: CODES.DISCOUNT_EXISTED,
                message: 'The discount code has been existed',
            });
        }
    }

    static async ensureValidDiscount({
        code,
        discount,
        userID,
        criteria = {},
    }) {
        /* 1. Get discount */
        const discountObject = !discount
            ? await discountModel
                  .findOne({
                      code,
                  })
                  .lean()
            : discount;

        /* 2. The discount active */
        if (criteria.active && !discountObject.is_active) {
            throw new BadRequestError({
                code: CODES.DISCOUNT_EXPIRED,
                message: 'The discount has been expired',
            });
        }

        /* 3. The discount not expired */

        if (
            criteria.notExpire &&
            Date.now() > new Date(discountObject.end_time)
        ) {
            throw new BadRequestError({
                code: CODES.DISCOUNT_EXPIRED,
                message: 'The discount has been expired',
            });
        }

        /* 3. The discount still has available slots */
        if (
            criteria.availabelSlots &&
            discountObject.max_use === discountObject.use_count
        ) {
            throw new BadRequestError({
                code: CODES.DISCOUNT_MAX_USE,
                message: 'No more uses left for the discount',
            });
        }

        /* 3.How many time the user has used the discount */
        if (criteria.availableSlotsForUser) {
            const isStillUseable = isBelowFrequencyLimit({
                value: userID,
                array: discountObject.users_used,
                limit: discountObject.max_per_user,
            });

            if (!isStillUseable) {
                throw new BadRequestError({
                    code: CODES.DISCOUNT_MAX_USE_FOR_USER,
                    message: 'No more uses left for the user',
                });
            }
        }
    }

    static async getValidDiscounts({
        selectedProps = [],
        unselectedProps = [],
    }) {
        return await discountModel
            .find({
                is_active: true,
                end_time: { $gt: Date.now() },
                $expr: {
                    $lt: ['$use_count', '$max_use'],
                },
            })
            .select(unSelectProps(unselectedProps))
            .select(selectProps(selectedProps))
            .lean();
    }
}

/* Export the repo */
module.exports = DiscountRepo;
