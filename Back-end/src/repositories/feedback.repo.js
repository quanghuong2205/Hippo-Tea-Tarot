'use strict';
const { Types } = require('mongoose');
const { unSelectProps, selectProps, getSkip } = require('../utils');
const FeedbackModel = require('../models/feedback.model');
const ProductRepo = require('./product.repo');

/* Define the repo */
class FeedbackRepo {
    /**
     * @desc get the feedback based on userID and productID
     * @returns
     */
    static async getFeedback({
        userID,
        productID,
        unselectedProps = [],
        selectedProps = [],
    }) {
        const feedbackObject = await FeedbackModel.findOne({
            user: new Types.ObjectId(userID),
            product: new Types.ObjectId(productID),
        })
            .select(unSelectProps(unselectedProps))
            .select(selectProps(selectedProps))
            .lean();

        return feedbackObject;
    }

    /**
     * @desc get the feedback based on ID
     * @returns
     */
    static async getFeedbackByID({
        feedbackID,
        unselectedProps = [],
        selectedProps = [],
    }) {
        const feedbackObject = await FeedbackModel.findOne({
            _id: new Types.ObjectId(feedbackID),
        })
            .select(unSelectProps(unselectedProps))
            .select(selectProps(selectedProps))
            .lean();

        return feedbackObject;
    }

    /**
     * @desc get the feedback based on ID
     * @returns
     */
    static async getFeedbacks({
        unselectedProps = [],
        selectedProps = [],
        limit,
        page,
        productID,
    }) {
        return await FeedbackModel.find({
            product: new Types.ObjectId(productID),
        })
            .populate('user', 'name avatar')
            .limit(limit)
            .skip(getSkip({ limit, page }))
            .select(selectProps(selectedProps))
            .select(unSelectProps(unselectedProps));
    }

    /**
     * @desc Create a new feedback based on the category
     * @returns
     */
    static async createFeedback({ userID, props }) {
        /**
         * Create product type
         */
        const feedbackObject = await FeedbackModel.create({
            ...props,
            user: userID,
        });

        /* Update rating score of product */
        const numOfFeedbacks = await FeedbackModel.countDocuments({
            product: props.product,
        });
        const newRatingScore = parseInt(props.rating_star);
        await ProductRepo.updateRatingScore({
            productID: props.product,
            ratingScore: newRatingScore,
            totalFeedbacksAfterModify: numOfFeedbacks,
            queryType: 'add',
        });

        /* Return new feedback */
        return feedbackObject;
    }

    /**
     * @desc Delete the feedback based on the ID
     */
    static async deleteFeedback({
        feedbackID,
        productID,
        feedbackRatingScore,
        unselectedProps = [],
        selectedProps = [],
    }) {
        /* Delete feedback */
        const feedbackObject = await FeedbackModel.findOneAndDelete({
            _id: new Types.ObjectId(feedbackID),
        })
            .select(unSelectProps(unselectedProps))
            .select(selectProps(selectedProps));

        /* Update rating score of product */
        const numOfFeedbacks = await FeedbackModel.countDocuments({
            product: productID,
        });
        const newRatingScore = parseInt(feedbackRatingScore);
        await ProductRepo.updateRatingScore({
            productID,
            ratingScore: newRatingScore,
            totalFeedbacksAfterModify: numOfFeedbacks,
            queryType: 'delete',
        });

        /* Return removed feedback */
        return feedbackObject;
    }

    /**
     * @desc Update the feedback based on the ID
     */
    static async updateFeedback({
        feedbackID,
        productID,
        ratingScoreBeforeUpdate,
        updatedProps,
        unselectedProps = [],
        selectedProps = [],
    }) {
        const feedbackObject = await FeedbackModel.findOneAndUpdate(
            {
                _id: new Types.ObjectId(feedbackID),
            },
            updatedProps,
            {
                new: true,
            }
        )
            .select(unSelectProps(unselectedProps))
            .select(selectProps(selectedProps));

        /* Update rating score of product */
        const numOfFeedbacks = await FeedbackModel.countDocuments({
            product: productID,
        });
        const newRatingScore = parseInt(updatedProps.rating_star);
        await ProductRepo.updateRatingScore({
            productID,
            ratingScore: newRatingScore,
            ratingScoreBeforeUpdate,
            totalFeedbacksAfterModify: numOfFeedbacks,
            queryType: 'update',
        });

        /* Return updated feedback */
        return feedbackObject;
    }

    /**
     * @desc Update the reply based on the category
     * @returns
     */
    static async updateReply({
        feedbackID,
        reply,
        unselectedProps = [],
        selectedProps = [],
    }) {
        return await FeedbackModel.findOneAndUpdate(
            {
                _id: new Types.ObjectId(feedbackID),
            },
            {
                reply: reply,
            },
            {
                new: true,
            }
        )
            .select(unSelectProps(unselectedProps))
            .select(selectProps(selectedProps));
    }

    /**
     * @desc Push the user who like the feedback
     * @returns
     */
    static async likeFeedback({
        userID,
        feedbackID,
        unselectedProps = [],
        selectedProps = [],
    }) {
        return await FeedbackModel.findOneAndUpdate(
            {
                _id: new Types.ObjectId(feedbackID),
            },
            {
                $push: { likes: userID },
            },
            {
                new: true,
            }
        )
            .select(unSelectProps(unselectedProps))
            .select(selectProps(selectedProps));
    }

    /**
     * @desc Push the user who like the feedback
     * @returns
     */
    static async unLikeFeedback({
        userID,
        feedbackID,
        unselectedProps = [],
        selectedProps = [],
    }) {
        return await FeedbackModel.findOneAndUpdate(
            {
                _id: new Types.ObjectId(feedbackID),
            },
            {
                $pull: { likes: userID },
            },
            {
                new: true,
            }
        )
            .select(unSelectProps(unselectedProps))
            .select(selectProps(selectedProps));
    }

    /**
     * @desc Create a new reply for the feedback
     * @returns
     */
    static async updateReply({
        feedbackID,
        replyText,
        unselectedProps = [],
        selectedProps = [],
    }) {
        return await FeedbackModel.findOneAndUpdate(
            {
                _id: new Types.ObjectId(feedbackID),
            },
            {
                $set: { reply: replyText },
            },
            {
                new: true,
            }
        )
            .select(unSelectProps(unselectedProps))
            .select(selectProps(selectedProps));
    }
}

/* Export the repo */
module.exports = FeedbackRepo;
