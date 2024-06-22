'use strict';
const HTTP_HEADERS = require('../../constants/http.headers.constants');
const KeyRepo = require('../../repositories/key.repo');
const UserRepo = require('../../repositories/user.repo');
const JWTServices = require('../../services/jwt.service');
const CODES = require('../../utils/code.http');
const {
    BadRequestError,
    UnauthorizedError,
} = require('../../utils/error.response.util');
const { checkID, checkMongoID } = require('../../utils/mongoose.util');

/* Define middlewares */
const verifyClientID = async (req, res, next) => {
    const clientID = req.headers[HTTP_HEADERS.CLIENTID];
    /* Not provide client id */
    if (!clientID) {
        throw new BadRequestError({
            message: 'Can not verify user',
            code: CODES.AUTH_MISS_CLIENT_ID,
        });
    }

    /* Invalid ID format */
    checkMongoID({
        id: clientID,
        message: 'Invalid clientID',
    });

    /**
     * Verify clientID
     */
    const userObject = await UserRepo.findUserByID({
        userID: clientID,
    });

    if (!userObject) {
        throw new BadRequestError({
            message: 'Can not verify user',
            code: CODES.AUTH_INVALID_CLIENT_ID,
        });
    }

    /* Attach client id to the response object */
    req.clientID = clientID;
    req.role = userObject.role;

    /* Next middleware */
    next();
};

const verifyAccessToken = async (req, res, next) => {
    /**
     * Get the access token from headers
     *   format (Bear xxx)
     */
    let accessToken = req.headers[HTTP_HEADERS.ACCESS_TOKEN];
    if (!accessToken) {
        throw new UnauthorizedError({
            code: CODES.MISS_ACCESS_TOKEN,
        });
    }

    accessToken = accessToken.split(' ')[1];

    /**
     * Find the token in the database
     */
    const keyObject = await KeyRepo.findKeyByUserID({
        userID: req.clientID,
    });

    if (!keyObject) {
        throw new UnauthorizedError({
            code: CODES.INVALID_ACCESS_TOKEN,
        });
    }

    /**
     * Verify the token
     */
    const publicKey = keyObject.public_key;
    const decodedPayload = await JWTServices.verifyAccessToken({
        publicKey,
        accessToken,
    });

    if (decodedPayload.id !== req.clientID) {
        throw new UnauthorizedError({
            code: CODES.INVALID_ACCESS_TOKEN,
        });
    }

    /**
     * Attach the token to the request object
     */
    req.accessToken = accessToken;

    /**
     * Next middleware
     */
    next();
};

const verifyRefreshToken = async (req, res, next) => {
    /**
     * Get the refresh token from headers
     *   format (Bear xxx)
     */
    let refreshToken = req.headers[HTTP_HEADERS.REFRESH_TOKEN];
    console.log(refreshToken);
    if (!refreshToken) {
        throw new UnauthorizedError({
            code: CODES.MISS_REFRESH_TOKEN,
        });
    }

    refreshToken = refreshToken.split(' ')[1];

    /**
     * Find the token in the database
     */
    const keyObject = await KeyRepo.findKeyByUserID({
        userID: req.clientID,
    });

    if (!keyObject) {
        throw new UnauthorizedError({
            code: CODES.INVALID_REFRESH_TOKEN,
        });
    }

    /**
     * Verify the token
     */
    const privateKey = keyObject.private_key;
    const decodedPayload = await JWTServices.verifyRefreshToken({
        privateKey,
        refreshToken,
    });

    if (decodedPayload.id !== req.clientID) {
        throw new UnauthorizedError({
            code: CODES.INVALID_REFRESH_TOKEN,
        });
    }

    /**
     * Attach the token to the request object
     */
    req.refreshToken = refreshToken;

    /**
     * Next middleware
     */
    next();
};

/**
 * Export middlewares
 */
module.exports = {
    verifyClientID,
    verifyAccessToken,
    verifyRefreshToken,
};
