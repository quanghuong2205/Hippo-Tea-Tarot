'use strict';
const { Types } = require('mongoose');
const MODELS = require('../models');
const { unSelectProps, selectProps } = require('../utils');
const { deleteOne } = require('../models/discount.model');

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
            .select(selectProps(selectedProps))
            .lean();
    }

    static async findMany({
        filter,
        model,
        selectedProps = [],
        unselectedProps = [],
    }) {
        const Model = MODELS[model.toUpperCase()];

        if (!Model) {
            throw new Error(`Model ${model} does not exist`);
        }

        return await Model.find(filter)
            .select(unSelectProps(unselectedProps))
            .select(selectProps(selectedProps))
            .lean();
    }

    static async createOne({ props, model }) {
        const Model = MODELS[model.toUpperCase()];

        if (!Model) {
            throw new Error(`Model ${model} does not exist`);
        }

        return await Model.create(props);
    }

    static async deleteOne({
        model,
        filter,
        selectedProps = [],
        unselectedProps = [],
    }) {
        const Model = MODELS[model.toUpperCase()];

        if (!Model) {
            throw new Error(`Model ${model} does not exist`);
        }

        return await Model.findOneAndDelete({ ...filter })
            .select(unSelectProps(unselectedProps))
            .select(selectProps(selectedProps));
    }

    static async updateOne({
        model,
        filter,
        updatedProps,
        selectedProps = [],
        unselectedProps = [],
    }) {
        const Model = MODELS[model.toUpperCase()];

        if (!Model) {
            throw new Error(`Model ${model} does not exist`);
        }

        return await Model.findOneAndUpdate(
            {
                ...filter,
            },
            updatedProps,
            {
                new: true,
            }
        )
            .select(unSelectProps(unselectedProps))
            .select(selectProps(selectedProps));
    }
}

/* Export the repo */
module.exports = CommonRepo;
