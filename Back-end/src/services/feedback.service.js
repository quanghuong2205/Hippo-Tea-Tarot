'use strict';
const CODES = require('../utils/code.http');
const {
    BadRequestError,
    ConflictError,
} = require('../utils/error.response.util');
const { checkMongoID } = require('../utils/mongoose.util');
const FileServices = require('./file.service');
const { removeNullOrUndefinedProps, flattenObject } = require('../utils');
const FeedbackRepo = require('../repositories/feedback.repo');
const MulterServices = require('./multer.service');

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
        checkMongoID({
            id: productID,
            message: 'Invalid productID',
        });

        return await FeedbackRepo.getFeedback({
            userID,
            productID,
        });
    }

    /**
     * @desc get all feedbacks
     */
    static async getAllFeedbacks({ page = 0, limit = 50, productID }) {
        checkMongoID({
            id: productID,
            message: 'Invalid productID',
        });

        /* Query products */
        return await FeedbackRepo.getFeedbacks({
            unselectedProps: ['__v'],
            page: parseInt(page),
            limit: parseInt(limit),
            productID,
        });
    }

    /**
     * @desc Create a new feedback
     */
    static async createFeedback({
        userID,
        productID,
        fileObjects,
        feedbackProps,
    }) {
        checkMongoID({
            id: productID,
            message: 'Invalid feedbackID',
        });

        /* Check if userID has been feedbacked */
        const feedbackObject = await FeedbackRepo.getFeedback({
            userID,
            productID,
        });

        if (feedbackObject) {
            throw new BadRequestError({
                message: 'Has already given the feedback',
                code: CODES.FEEDBACK_EXISTED,
            });
        }

        /* Upload files */
        const newThumbPaths = await FileServices.writeMultiFiles({
            fileObjects,
            type: 'feedback',
        });

        return await FeedbackRepo.createFeedback({
            props: {
                ...feedbackProps,
                product: productID,
                thumbs: newThumbPaths,
            },
            userID,
        });
    }

    /**
     * @desc Update a product based on the feedback id
     */
    static async updateFeedback({
        feedbackID,
        fileObjects,
        feedbackProps,
        userID,
    }) {
        checkMongoID({
            id: feedbackID,
            message: 'Invalid feedbackID',
        });

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

        /* Store new feedback's files */
        const newThumbPaths = await FileServices.writeMultiFiles({
            fileObjects,
            type: 'feedback',
        });

        /* Unlink stale feedback's files */
        const feedbackFilePaths = feedbackObject.thumbs;
        /* Remain file field in multipart form could be
            string, empty string, or array of string
        */
        const remainedFilePaths =
            typeof feedbackProps?.remain_thumbs === 'string'
                ? [
                      ...(feedbackProps.remain_thumbs !== ''
                          ? [feedbackProps.remain_thumbs]
                          : []),
                  ]
                : feedbackProps?.remain_thumbs;

        console.log('remained files::', remainedFilePaths);
        const removedFilePaths =
            remainedFilePaths.length === 0
                ? feedbackFilePaths
                : feedbackFilePaths.filter(
                      (t) => !remainedFilePaths.includes(t)
                  );
        console.log('removed files::', removedFilePaths);

        if (removedFilePaths.length !== 0) {
            await FileServices.removeMultiFiles({
                relativePaths: removedFilePaths,
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
                thumbs: [...newThumbPaths, ...remainedFilePaths],
            },
            unselectedProps: ['__v'],
        });
    }

    /**
     * @desc Delete a product based on the product id
     */
    static async deleteFeedback({ feedbackID, userID }) {
        checkMongoID({
            id: feedbackID,
            message: 'Invalid feedbackID',
        });

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
     * @desc Like feedback
     */
    static async likeFeedback({ userID, feedbackID }) {
        checkMongoID({
            id: feedbackID,
            message: 'Invalid feedbackID',
        });

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
        checkMongoID({
            id: feedbackID,
            message: 'Invalid feedbackID',
        });

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
        checkMongoID({
            id: feedbackID,
            message: 'Invalid feedbackID',
        });

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
        checkMongoID({
            id: feedbackID,
            message: 'Invalid feedbackID',
        });

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
        checkMongoID({
            id: feedbackID,
            message: 'Invalid feedbackID',
        });

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
            replyText: '',
            unselectedProps: ['__v'],
        });
    }
}

/**
 * Export service
 */
module.exports = FeedbackServices;
