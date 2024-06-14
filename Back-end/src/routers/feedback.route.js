'use strict';
const express = require('express');
const FeedbackRouter = express.Router();
const FeedbackController = require('../controllers/feedback.controller');

/**
 * RBAC
 */
const RBAC = require('../cores/Role-based-access-controll');
const rbac = new RBAC();
rbac.setGrants({ permissionType: 'feedback' });

/**
 * Middlewares
 */
const {
    verifyClientID,
    verifyAccessToken,
} = require('../middlewares/auth');
const ErrorHandler = require('../utils/error.hanlder');
const { verifyGrant } = require('../middlewares/access-controll');
const grantVerifier = verifyGrant({ rbac });

/**
 * USER ROUTES
 */

/* [GET] [/feedback/:pid] */
FeedbackRouter.get('/:pid', ErrorHandler(FeedbackController.getFeedbacks));

FeedbackRouter.use(ErrorHandler(verifyClientID));
// FeedbackRouter.use(ErrorHandler(verifyAccessToken));

/* [GET] [/feedback?product=] */
FeedbackRouter.get('/', ErrorHandler(FeedbackController.getFeedback));

/* [POST] [/feedback] */
FeedbackRouter.post(
    '/',
    grantVerifier({ resource: 'feedback', action: 'createOwn' }),
    ErrorHandler(FeedbackController.createFeedback)
);

/* [DELETE] [/feedback/:id] */
FeedbackRouter.delete(
    '/:id',
    grantVerifier({ resource: 'feedback', action: 'deleteOwn' }),
    ErrorHandler(FeedbackController.deleteFeedback)
);

/* [DELETE] [/feedback/:id] */
FeedbackRouter.patch(
    '/:id',
    grantVerifier({ resource: 'feedback', action: 'updateOwn' }),
    ErrorHandler(FeedbackController.updateFeedback)
);

/* [POST] [/feedback/:fid/like] */
FeedbackRouter.post(
    '/:fid/like',
    grantVerifier({ resource: 'like', action: 'createAny' }),
    ErrorHandler(FeedbackController.likeFeedback)
);

/* [DELETE] [/feedback/:fid/like] */
FeedbackRouter.delete(
    '/:fid/like',
    grantVerifier({ resource: 'like', action: 'deleteAny' }),
    ErrorHandler(FeedbackController.unlikeFeedback)
);

/**
 * ADMIN ROUTES
 */

/* [DELETE] [/feedback/:fid/reply] */
FeedbackRouter.delete(
    '/:fid/reply',
    grantVerifier({ resource: 'reply', action: 'deleteAny' }),
    ErrorHandler(FeedbackController.deleteReply)
);

/* [POST] [/feedback/:fid/reply] */
FeedbackRouter.post(
    '/:fid/reply',
    grantVerifier({ resource: 'reply', action: 'createAny' }),
    ErrorHandler(FeedbackController.createReply)
);

/* [PATCH] [/feedback/:id/reply] */
FeedbackRouter.patch(
    '/:fid/reply',
    grantVerifier({ resource: 'reply', action: 'updateAny' }),
    ErrorHandler(FeedbackController.updateReply)
);

/* Export the router */
module.exports = FeedbackRouter;
