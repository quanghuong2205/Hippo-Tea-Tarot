'use strict';
const CODES = require('../utils/code.http');
const ProductRepo = require('../repositories/product.repo');
const {
    BadRequestError,
    ConflictError,
} = require('../utils/error.response.util');
const { checkID } = require('../utils/mongoose.util');
const FileServices = require('./file.service');
const { removeNullOrUndefinedProps, flattenObject } = require('../utils');
const FeedbackRepo = require('../repositories/feedback.repo');

/**
 * Product service
 */
/* Define the service */
class FeedbackServices {
    static async checkFeedback() {}

    /**
     * @desc Get the feedback based on userID and productID
     */
    static async getFeedback({ userID, productID }) {
        if (!checkID({ id: productID })) {
            throw new BadRequestError({
                message: 'Invalid productID',
                code: CODES.MONGODB_INVALID_ID,
            });
        }

        return await FeedbackRepo.getFeedback({
            userID,
            productID,
        });
    }

    /**
     * @desc Create a new feedback
     */
    static async createFeedback({
        userID,
        feedbackProps,
        relativePaths,
        productID,
    }) {
        return await FeedbackRepo.createFeedback({
            props: {
                ...feedbackProps,
                product: productID,
                thumbs: relativePaths ? relativePaths : [],
            },
            userID,
        });
    }

    /**
     * @desc Delete a product based on the product id
     */
    static async deleteFeedback({ feedbackID, userID }) {
        if (!checkID({ id: feedbackID })) {
            throw new BadRequestError({
                message: 'Invalid feedbackID',
                code: CODES.MONGODB_INVALID_ID,
            });
        }

        /* Check if the feedback existed */
        const feedbackObject = await FeedbackRepo.getFeedbackByID({
            feedbackID,
        });

        if (!feedbackObject) {
            throw new BadRequestError({
                message: 'Feedback not exist',
                code: CODES.FEEDBACK_NOT_EXIST,
            });
        }
        /* The feedback must belong to user */
        if (feedbackObject.user.toString() !== userID) {
            throw new BadRequestError({
                message: 'Can not delete feedback of another one',
                code: CODES.FEEDBACK_CAN_NOT_DELETE_OF_ANOTHERONE,
            });
        }

        /* Unlink files */
        const feedbackThumbs = feedbackObject?.thumbs;
        if (feedbackThumbs) {
            await FileServices.removeMultiFiles({
                relativePaths: feedbackThumbs,
            });
        }

        /* Delete the feedback */
        return await FeedbackRepo.deleteFeedback({
            feedbackID,
            productID: feedbackObject.product,
            feedbackRatingScore: feedbackObject.rating_star,
            unselectedProps: ['__v', 'thumbs'],
        });
    }

    /**
     * @desc Delete a product based on the product id
     */
    static async updateFeedback({
        feedbackID,
        feedbackProps,
        relativePaths = [],
        feedbackObject,
    }) {
        /* Unlink stale feedback's thumbs */
        const feedbackThumbs = feedbackObject.thumbs;
        const remainingThumbs =
            typeof feedbackProps?.remain_thumbs === 'string'
                ? [feedbackProps?.remain_thumbs]
                : [];

        const finalPaths =
            remainingThumbs.length === 0
                ? feedbackThumbs
                : feedbackThumbs.filter(
                      (t) => !remainingThumbs.includes(t)
                  );

        if (finalPaths.length !== 0) {
            await FileServices.removeMultiFiles({
                relativePaths: finalPaths,
            });
        }

        /* Remove undefined props and flatten the updated object */
        removeNullOrUndefinedProps({ feedbackProps });

        /* Update the products */
        return await FeedbackRepo.updateFeedback({
            feedbackID,
            productID: feedbackObject.product,
            ratingScoreBeforeUpdate: feedbackObject.rating_star,
            updatedProps: {
                ...feedbackProps,
                thumbs: [...relativePaths, ...remainingThumbs],
            },
            unselectedProps: ['__v'],
        });
    }

    /**
     * @desc get all feedbacks
     */
    static async getAllFeedbacks({ page = 0, limit = 10, productID }) {
        if (!checkID({ id: productID })) {
            throw new BadRequestError({
                message: 'Invalid productID to get feedback',
                code: CODES.MONGODB_INVALID_ID,
            });
        }

        /* Query products */
        return await FeedbackRepo.getFeedbacks({
            unselectedProps: ['__v'],
            page: parseInt(page),
            limit: parseInt(limit),
            productID,
        });
    }

    /**
     * @desc Like feedback
     */
    static async likeFeedback({ userID, feedbackID }) {
        /* Check if the feedback existed */
        const feedbackObject = await FeedbackRepo.getFeedbackByID({
            feedbackID,
        });

        if (!feedbackObject) {
            throw new BadRequestError({
                message: 'Feedback not exist',
                code: CODES.FEEDBACK_NOT_EXIST,
            });
        }

        /* Check if has liked the feedback */
        const likeArray = feedbackObject.likes;

        if (likeArray.includes(userID)) {
            throw new ConflictError({
                message: 'Has already liked the feedback',
                code: CODES.FEEDBACK_ALREADY_LIKED,
            });
        }

        return await FeedbackRepo.likeFeedback({
            userID,
            feedbackID,
            unselectedProps: ['__v'],
        });
    }

    /**
     * @desc Unlike feedback
     */
    static async unlikeFeedback({ userID, feedbackID }) {
        /* Check if the feedback existed */
        const feedbackObject = await FeedbackRepo.getFeedbackByID({
            feedbackID,
        });

        if (!feedbackObject) {
            throw new BadRequestError({
                message: 'Feedback not exist',
                code: CODES.FEEDBACK_NOT_EXIST,
            });
        }

        /* Check if has liked the feedback */
        const likeArray = feedbackObject.likes;

        if (!likeArray.includes(userID)) {
            throw new ConflictError({
                message: 'Has already unliked the feedback',
                code: CODES.FEEDBACK_ALREADY_UNLIKED,
            });
        }

        return await FeedbackRepo.unLikeFeedback({
            userID,
            feedbackID,
            unselectedProps: ['__v'],
        });
    }

    /**
     * @desc Create the reply for feedback
     */
    static async createReply({ feedbackID, replyText }) {
        /* Check if the feedback existed */
        const feedbackObject = await FeedbackRepo.getFeedbackByID({
            feedbackID,
        });

        if (!feedbackObject) {
            throw new BadRequestError({
                message: 'Feedback not exist',
                code: CODES.FEEDBACK_NOT_EXIST,
            });
        }

        return await FeedbackRepo.updateReply({
            feedbackID,
            replyText,
            unselectedProps: ['__v'],
        });
    }

    /**
     * @desc Update the reply for feedback
     */
    static async updateReply({ feedbackID, replyText }) {
        /* Check if the feedback existed */
        const feedbackObject = await FeedbackRepo.getFeedbackByID({
            feedbackID,
        });

        if (!feedbackObject) {
            throw new BadRequestError({
                message: 'Feedback not exist',
                code: CODES.FEEDBACK_NOT_EXIST,
            });
        }

        return await FeedbackRepo.updateReply({
            feedbackID,
            replyText,
            unselectedProps: ['__v'],
        });
    }

    /**
     * @desc Delete the reply for feedback
     */
    static async deleteReply({ feedbackID }) {
        /* Check if the feedback existed */
        const feedbackObject = await FeedbackRepo.getFeedbackByID({
            feedbackID,
        });

        if (!feedbackObject) {
            throw new BadRequestError({
                message: 'Feedback not exist',
                code: CODES.FEEDBACK_NOT_EXIST,
            });
        }

        if (feedbackObject.reply === '') {
            throw new BadRequestError({
                message: 'No reply to delete',
                code: CODES.FEEDBACK_REPLY_NOT_EXISTED,
            });
        }

        return await FeedbackRepo.updateReply({
            feedbackID,
            replyText: '',
            unselectedProps: ['__v'],
        });
    }
}

/**
 * Export service
 */
module.exports = FeedbackServices;
