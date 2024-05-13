'use strict';

const UserRepo = require('../repositories/user.repo');
const {
    NotFoundError,
    ServerError,
    UnauthorizedError,
    ConflictError,
} = require('../helpers/error.res.helper');
const { unSelectPropsInObject } = require('../utils');
const CODES = require('../utils/code.http');
const KeyServices = require('./key.service');
const JWTServices = require('./jwt.service');
const KeyRepo = require('../repositories/key.repo');
const bcrypt = require('bcrypt');

/* Define the service */
class AuthServices {
    /**
     * @desc Login user
     * @param {string} email
     * @param {string} password
     */
    static async signIn({ email, password }) {
        /**
         * Verify user
         */
        const userObject = await UserRepo.findUserByEmail({
            email,
        });

        if (!userObject) {
            throw new NotFoundError({
                message: 'The account is not registered',
                code: CODES.AUTH_NOT_REGISTED,
            });
        }

        /**
         * Verify password
         */
        const hashedPassword = userObject.password;
        const isMatched = bcrypt.compareSync(password, hashedPassword);
        if (!isMatched) {
            throw new UnauthorizedError({
                message: 'The credentials are not correct',
                code: CODES.AUTH_WRONG_PASSWORD,
            });
        }

        /**
         * Extract the payload
         */
        const payload = {
            id: userObject._id,
            email: userObject.email,
        };

        /**
         * Generate a pair of keys
         */
        const { publicKey, privateKey } = KeyServices.generateKeyPair();

        /**
         * Sign tokens
         */
        const { accessToken, refreshToken } =
            await JWTServices.signTokenPair({
                publicKey,
                privateKey,
                payload,
            });

        /**
         * Save tokens to the database
         */
        const keyObject = await KeyRepo.saveKey({
            publicKey,
            privateKey,
            refreshToken,
            userID: userObject._id,
        });
        if (!keyObject) {
            throw new ServerError({
                code: CODES.FAIL_TO_CREATE_DOCUMENT,
            });
        }

        /**
         * Return tokens + clientID
         */
        return {
            tokens: {
                accessToken,
                refreshToken,
            },
            user: unSelectPropsInObject({
                object: userObject,
                props: ['password', '__v', 'updatedAt', 'createdAt'],
            }),
        };
    }

    /**
     * @desc Register new user
     * @param {string} email
     * @param {string} password
     */
    static async signUp({ email, password, name }) {
        /**
         * Verify existed user
         */
        const userObject = await UserRepo.findUserByEmail({
            email,
        });

        if (userObject) {
            throw new ConflictError({
                code: CODES.AUTH_USER_EXISTED,
                message: 'The user has been registed',
            });
        }

        /**
         * Create user
         */
        const newUserObject = await UserRepo.createUser({
            email,
            password,
            name,
        });

        if (!newUserObject) {
            throw new ServerError({
                code: CODES.FAIL_TO_CREATE_DOCUMENT,
            });
        }

        /**
         * Return user
         */
        return {
            user: unSelectPropsInObject({
                object: newUserObject,
                props: ['password', '__v'],
            }),
        };
    }
}

/**
 * Export service
 */
module.exports = AuthServices;
