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
        if (!req?.role) {
            throw new BadRequestError({
                message: 'Not provide role',
                code: CODES.AUTH_MISS_ROLE,
            });
        }

        const isGranted = rbac.granted({
            role: req.role,
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
