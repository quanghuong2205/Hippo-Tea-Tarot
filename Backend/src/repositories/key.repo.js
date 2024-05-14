'use strict';
const { Types } = require('mongoose');
const KeyModel = require('../models/key.model');

/* Define the repo */
class KeyRepo {
    /**
     * @desc Save the new key to the database
     * @param {string} publicKey
     * @param {string} privateKey
     * @param {string} refreshToken
     * @param {string} userID
     * @returns
     */
    static async saveKey({ publicKey, privateKey, refreshToken, userID }) {
        const FILTER = { user: new Types.ObjectId(userID) };
        const UPDATE = {
            user: userID,
            public_key: publicKey,
            private_key: privateKey,
            refresh_token: refreshToken,
        };
        const OPTIONS = { upsert: true, new: true };
        const keyObject = await KeyModel.findOneAndUpdate(
            FILTER,
            UPDATE,
            OPTIONS
        ).lean();

        return keyObject;
    }

    /**
     * @desc Find the key based on the user's id
     * @param {string} userID
     * @returns
     */
    static async findKeyByUserID({ userID }) {
        const keyObject = await KeyModel.findOne({
            user: new Types.ObjectId(userID),
        });

        return keyObject;
    }

    /**
     * @desc Find the key based on the user's id
     * @param {string} userID
     * @returns
     */
    static async findKeyByUserID({ userID }) {
        const keyObject = await KeyModel.findOne({
            user: userID,
        });

        return keyObject;
    }

    /**
     * @desc Remove the key based on the user's id
     * @param {string} userID
     * @returns
     */
    static async removeKeyByUserID({ userID }) {
        const keyObject = await KeyModel.deleteOne({
            user: userID,
        });

        return keyObject;
    }
}

/* Export the repo */
module.exports = KeyRepo;
