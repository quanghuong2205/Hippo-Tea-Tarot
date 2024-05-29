'use strict';

const CategoryModel = require('./category.model');
const FeedbackModel = require('./feedback.model');
const KeyModel = require('./key.model');
const UserModel = require('./user.model');
const ProductModel = require('./product.model');

const MODELS = {
    CATEGORY: CategoryModel,
    FEEDBACK: FeedbackModel,
    KEY: KeyModel,
    USER: UserModel,
    PRODUCT: ProductModel,
};

module.exports = MODELS;
