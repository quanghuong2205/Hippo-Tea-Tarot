'use strict';
const { Types } = require('mongoose');
const userModel = require('../models/user.model');
const UserModel = require('../models/user.model');
const { selectProps, unSelectProps } = require('../utils');

/* Define the repo */
class UserRepo {
    static async findUserByEmail({
        email,
        selectedProps = [],
        unSelectedProps = [],
    }) {
        const userObject = await UserModel.findOne({
            email,
        })
            .select(selectProps(selectedProps))
            .select(unSelectProps(unSelectedProps))
            .lean();
        return userObject;
    }

    static async findUserByID({ userID }) {
        const userObject = await UserModel.findById(userID).lean();
        return userObject;
    }

    static async createUser({ email, password, name }) {
        const userObject = await UserModel.create({
            email,
            password,
            name,
        });

        return userObject._doc;
    }

    static async updateAvatarUrl({ userID, avatarUrl }) {
        /* Update avatar */
        const userObject = await userModel.findOneAndUpdate(
            { _id: new Types.ObjectId(userID) },
            { avatar: avatarUrl },
            { new: true }
        );

        return userObject;
    }
}

/* Export the repo */
module.exports = UserRepo;
