'use strict';

const CODES = require('../../utils/code.http');
const {
    BadRequestError,
    ForbiddenError,
} = require('../../utils/error.response.util');

/* Define middlewares */
const verifyGrant =
    ({ rbac }) =>
    ({ resource, action }) =>
    (req, res, next) => {
        const isGranted = rbac.granted({
            role: req.role || 'guest',
            resource,
            action,
        });

        if (!isGranted) {
            throw new ForbiddenError({
                message: 'You do not have the permission',
                code: CODES.AUTH_NOT_HAVE_PERMISSION,
            });
        }

        next();
    };

/**
 * Export middlewares
 */
module.exports = {
    verifyGrant,
};
