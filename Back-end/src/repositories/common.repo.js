'use strict';
const { Types } = require('mongoose');
const MODELS = require('../models');
const { unSelectProps, selectProps } = require('../utils');

/* Define the repo */
class CommonRepo {
    static async findOne({
        filter,
        model,
        selectedProps = [],
        unselectedProps = [],
    }) {
        const Model = MODELS[model.toUpperCase()];

        if (!Model) {
            throw new Error(`Model ${model} does not exist`);
        }

        return await Model.findOne(filter)
            .select(unSelectProps(unselectedProps))
            .select(selectProps(selectedProps));
    }

    static async createOne({ props, model }) {
        const Model = MODELS[model.toUpperCase()];

        if (!Model) {
            throw new Error(`Model ${model} does not exist`);
        }

        return await Model.create(props);
    }
}

/* Export the repo */
module.exports = CommonRepo;
