'use strict';
const { OK, CREATED } = require('../utils/success.response.util');
const CODES = require('../utils/code.http');
const { BadRequestError } = require('../utils/error.response.util');
const FeedbackServices = require('../services/feedback.service');

/* Define the controller */
class FeedbackController {
    /**
     * @route [GET] /feedback/many?pid=
     */
    static async getFeedbacks(req, res, next) {
        if (!req.query?.pid) {
            throw new BadRequestError({
                message: 'Not provide the productID',
                code: CODES.PRODUCT_MISS_ID,
            });
        }

        return new OK({
            message: 'Got all feedbacks successfully',
            body: await FeedbackServices.getAllFeedbacks({
                page: req.query?.page,
                limit: req.query?.limit,
                productID: req.query.pid,
            }),
        }).sendResponse(res);
    }

    /**
     * @route [GET] /feedback?fid=
     */
    static async getFeedback(req, res, next) {
        if (!req.query?.pid) {
            throw new BadRequestError({
                message: 'Not provide the productID',
                code: CODES.PRODUCT_MISS_ID,
            });
        }
        return new OK({
            message: 'Got the feedback successfully',
            body: await FeedbackServices.getFeedback({
                userID: req.clientID,
                productID: req.query.pid,
            }),
            code: 200,
        }).sendResponse(res);
    }

    /**
     * @route [POST] /feedback?pid=
     */
    static async createFeedback(req, res, next) {
        if (!req.query?.pid) {
            throw new BadRequestError({
                message: 'Not provide the productID',
                code: CODES.PRODUCT_MISS_ID,
            });
        }

        const body = await FeedbackServices.createFeedback({
            userID: req.clientID,
            productID: req.query.pid,
            request: req,
            response: res,
        });

        return new CREATED({
            message: 'Has been given the feedback successfully',
            body,
        }).sendResponse(res);
    }

    /**
     * @route [PATCH] /feedback/?fid=
     */
    static async updateFeedback(req, res, next) {
        if (!req.query?.fid) {
            throw new BadRequestError({
                message: 'Not provide the id of the feedback',
                code: CODES.FEEDBACK_MISS_ID,
            });
        }

        const body = await FeedbackServices.updateFeedback({
            feedbackID: req.query.fid,
            request: req,
            response: res,
            userID: req.clientID,
        });

        return new OK({
            message: 'Updated the feedback successfuly',
            body,
        }).sendResponse(res);
    }

    /**
     * @route [DELETE] /feedback/?fid=
     */
    static async deleteFeedback(req, res, next) {
        if (!req.query?.fid) {
            throw new BadRequestError({
                message: 'Not provide the feedbackID',
                code: CODES.PRODUCT_MISS_ID,
            });
        }

        const body = await FeedbackServices.deleteFeedback({
            feedbackID: req.query.fid,
            userID: req.clientID,
        });

        return new OK({
            message: 'Deleted the feedback successfully',
            body,
        }).sendResponse(res);
    }

    /* ADMIN */
    /**
     * @route [POST] /feedback/reply?fid=
     */
    static async createReply(req, res, next) {
        if (!req.query?.fid) {
            throw new BadRequestError({
                message: 'Not provide the id of the feedback',
                code: CODES.FEEDBACK_MISS_ID,
            });
        }

        return new CREATED({
            message: 'Created the reply for feedback successfully',
            body: await FeedbackServices.createReply({
                feedbackID: req.query.fid,
                replyText: req.body.reply,
            }),
        }).sendResponse(res);
    }

    /**
     * @route [PATCH] /feedback/reply?fid=
     */
    static async updateReply(req, res, next) {
        if (!req.query?.fid) {
            throw new BadRequestError({
                message: 'Not provide the id of the feedback',
                code: CODES.FEEDBACK_MISS_ID,
            });
        }

        return new OK({
            message: 'Updated the reply for feedback successfully',
            body: await FeedbackServices.updateReply({
                feedbackID: req.query.fid,
                replyText: req.body.reply,
            }),
        }).sendResponse(res);
    }

    /**
     * @route [DELETE] /feedback/reply?fid=
     */
    static async deleteReply(req, res, next) {
        if (!req.query?.fid) {
            throw new BadRequestError({
                message: 'Not provide the id of the feedback',
                code: CODES.FEEDBACK_MISS_ID,
            });
        }

        return new OK({
            message: 'Deleted the reply for feedback successfully',
            body: await FeedbackServices.deleteReply({
                feedbackID: req.query.fid,
            }),
        }).sendResponse(res);
    }

    /**
     * @route [POST] /feedback/like?fid=
     */
    static async likeFeedback(req, res, next) {
        if (!req.query?.fid) {
            throw new BadRequestError({
                message: 'Not provide the id of the feedback',
                code: CODES.FEEDBACK_MISS_ID,
            });
        }

        return new OK({
            message: 'Liked the feedback successfully',
            body: await FeedbackServices.likeFeedback({
                userID: req.clientID,
                feedbackID: req.query.fid,
            }),
        }).sendResponse(res);
    }

    /**
     * @route [DELETE] /feedback/like?fid=
     */
    static async unlikeFeedback(req, res, next) {
        if (!req.query?.fid) {
            throw new BadRequestError({
                message: 'Not provide the id of the feedback',
                code: CODES.FEEDBACK_MISS_ID,
            });
        }

        return new OK({
            message: 'Unliked the feedback successfully',
            body: await FeedbackServices.unlikeFeedback({
                userID: req.clientID,
                feedbackID: req.query.fid,
            }),
        }).sendResponse(res);
    }
}

/* Export the controller */
module.exports = FeedbackController;
