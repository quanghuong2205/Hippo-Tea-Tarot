'use strict';
const { OK, CREATED } = require('../utils/success.response.util');
const CODES = require('../utils/code.http');
const { BadRequestError } = require('../utils/error.response.util');
const MulterServices = require('../services/multer.service');
const FeedbackServices = require('../services/feedback.service');
const FeedbackRepo = require('../repositories/feedback.repo');
const { checkID } = require('../utils/mongoose.util');

/* Define the controller */
class FeedbackController {
    /**
     * @route [GET] /feedback/all
     */
    static async getFeedbacks(req, res, next) {
        return new OK({
            message: '',
            body: await FeedbackServices.getAllFeedbacks({
                page: req.query?.page,
                limit: req.query?.limit,
                productID: req.params.pid,
            }),
        }).sendResponse(res);
    }

    /**
     * @route [GET] /feedback
     */
    static async getFeedback(req, res, next) {
        if (!req.query.product) {
            throw new BadRequestError({
                message: 'Not provide the productID',
                code: CODES.PRODUCT_MISS_ID,
            });
        }
        return new OK({
            message: 'Get feedback successfully',
            body: await FeedbackServices.getFeedback({
                userID: req.clientID,
                productID: req.query.product,
            }),
            code: 200,
        }).sendResponse(res);
    }

    /**
     * @route [POST] /feedback?product=
     */
    static async createFeedback(req, res, next) {
        const productID = req.query?.product;
        if (!productID) {
            throw new BadRequestError({
                message: 'Not provide the productID',
                code: CODES.PRODUCT_MISS_ID,
            });
        }

        if (!checkID({ id: productID })) {
            throw new BadRequestError({
                message: 'Invalid productID',
                code: CODES.MONGODB_INVALID_ID,
            });
        }

        /* Check if userID has been feedbacked */
        const feedbackObject = await FeedbackRepo.getFeedback({
            userID: req.clientID,
            productID: productID,
        });

        if (feedbackObject) {
            throw new BadRequestError({
                message: 'Has already given the feedback',
                code: CODES.FEEDBACK_EXISTED,
            });
        }

        /* Upload files */
        const relativePaths = await MulterServices.uploadMany({
            req,
            res,
            context: 'feedback',
        });

        const body = await FeedbackServices.createFeedback({
            userID: req.clientID,
            feedbackProps: req.body,
            relativePaths,
            productID: productID,
        });

        return new CREATED({
            message: 'Has been given the feedback successfully',
            body,
        }).sendResponse(res);
    }

    /**
     * @route [DELETE] /feedback/:id
     */
    static async deleteFeedback(req, res, next) {
        const body = await FeedbackServices.deleteFeedback({
            feedbackID: req.params.id,
            userID: req.clientID,
        });

        return new OK({
            message: 'Deleted the feedback successfully',
            body,
        }).sendResponse(res);
    }

    /**
     * @route [PATCH] /feedback/:id
     */
    static async updateFeedback(req, res, next) {
        const feedbackID = req.params?.id;

        if (!feedbackID) {
            throw new BadRequestError({
                message: 'Not provide the id of the feedback',
                code: CODES.FEEDBACK_MISS_ID,
            });
        }

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

        /* Upload feedback's thumbs */
        const relativePaths = await MulterServices.uploadMany({
            req,
            res,
            context: 'feedback',
        });

        const body = await FeedbackServices.updateFeedback({
            feedbackID: req.params.id,
            feedbackProps: req.body,
            relativePaths: relativePaths || [],
            feedbackObject,
        });

        return new OK({
            message: 'Updated the feedback successfuly',
            body,
        }).sendResponse(res);
    }

    /* ADMIN */
    /**
     * @route [POST] /feedback/reply
     */
    static async createReply(req, res, next) {
        return new CREATED({
            message: 'Created the reply for feedback successfully',
            body: await FeedbackServices.createReply({
                feedbackID: req.params.fid,
                replyText: req.body.reply,
            }),
        }).sendResponse(res);
    }

    /**
     * @route [DELETE] /feedback/reply
     */
    static async deleteReply(req, res, next) {
        return new OK({
            message: 'Deleted the reply for feedback successfully',
            body: await FeedbackServices.deleteReply({
                feedbackID: req.params.fid,
            }),
        }).sendResponse(res);
    }

    /**
     * @route [PATCH] /feedback/reply
     */
    static async updateReply(req, res, next) {
        return new OK({
            message: 'Updated the reply for feedback successfully',
            body: await FeedbackServices.updateReply({
                feedbackID: req.params.fid,
                replyText: req.body.reply,
            }),
        }).sendResponse(res);
    }

    /**
     * @route [POST] /feedback/like
     */
    static async likeFeedback(req, res, next) {
        return new OK({
            message: 'Liked the feedback successfully',
            body: await FeedbackServices.likeFeedback({
                userID: req.clientID,
                feedbackID: req.params.fid,
            }),
        }).sendResponse(res);
    }

    /**
     * @route [DELETE] /feedback/like
     */
    static async unlikeFeedback(req, res, next) {
        return new OK({
            message: 'Unliked the feedback successfully',
            body: await FeedbackServices.unlikeFeedback({
                userID: req.clientID,
                feedbackID: req.params.fid,
            }),
        }).sendResponse(res);
    }
}

/* Export the controller */
module.exports = FeedbackController;
