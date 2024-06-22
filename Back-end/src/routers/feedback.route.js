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
const { multipartFormParserMiddleware } = require('../middlewares/multer');
const grantVerifier = verifyGrant({ rbac });

/**
 * USER ROUTES
 */

/* [GET] [/feedback/many?pid=] */
FeedbackRouter.get('/many', ErrorHandler(FeedbackController.getFeedbacks));

FeedbackRouter.use(ErrorHandler(verifyClientID));
// FeedbackRouter.use(ErrorHandler(verifyAccessToken));

/* [GET] [/feedback?pid=] */
FeedbackRouter.get('/', ErrorHandler(FeedbackController.getFeedback));

/* [POST] [/feedback?pid = ] */
FeedbackRouter.post(
    '/',
    grantVerifier({ resource: 'feedback', action: 'createOwn' }),
    multipartFormParserMiddleware,
    ErrorHandler(FeedbackController.createFeedback)
);

/* [DELETE] [/feedback/?fid=] */
FeedbackRouter.delete(
    '/',
    grantVerifier({ resource: 'feedback', action: 'deleteOwn' }),
    ErrorHandler(FeedbackController.deleteFeedback)
);

/* [PATCH] [/feedback/?fid=] */
FeedbackRouter.patch(
    '/',
    grantVerifier({ resource: 'feedback', action: 'updateOwn' }),
    multipartFormParserMiddleware,
    ErrorHandler(FeedbackController.updateFeedback)
);

/* [POST] [/feedback/like?fid=] */
FeedbackRouter.post(
    '/like',
    grantVerifier({ resource: 'like', action: 'createAny' }),
    ErrorHandler(FeedbackController.likeFeedback)
);

/* [DELETE] [/feedback/like?fid=] */
FeedbackRouter.delete(
    '/like',
    grantVerifier({ resource: 'like', action: 'deleteAny' }),
    ErrorHandler(FeedbackController.unlikeFeedback)
);

/**
 * ADMIN ROUTES
 */

/* [POST] [/feedback/reply?fid=] */
FeedbackRouter.post(
    '/reply',
    grantVerifier({ resource: 'reply', action: 'createAny' }),
    ErrorHandler(FeedbackController.createReply)
);

/* [PATCH] [/feedbackreply?fid=] */
FeedbackRouter.patch(
    '/reply',
    grantVerifier({ resource: 'reply', action: 'updateAny' }),
    ErrorHandler(FeedbackController.updateReply)
);

/* [DELETE] [/feedback/reply?fid=] */
FeedbackRouter.delete(
    '/reply',
    grantVerifier({ resource: 'reply', action: 'deleteAny' }),
    ErrorHandler(FeedbackController.deleteReply)
);

/* Export the router */
module.exports = FeedbackRouter;
