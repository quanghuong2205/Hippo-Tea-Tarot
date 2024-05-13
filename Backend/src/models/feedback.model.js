'use strict';

const { Schema, model } = require('mongoose');

const COLLECTION_NAME = 'Feedbacks';
const DOCUMENT_NAME = 'Feedback';

// Declare the Schema of the Mongo model
const feedbackSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },

        product: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'Product',
        },

        comment: {
            type: String,
        },

        rating_star: {
            type: Number,
            required: true,
            min: [0, 'Rating must be above 0'],
            max: [5, 'Rating must be less 5'],
        },

        is_hidden: {
            type: String,
            default: false,
        },

        thumbs: {
            type: Array,
            default: [],
        },

        likes: {
            type: Array,
            default: [],
        },

        reply: {
            type: String,
            default: '',
        },
    },
    {
        timestamps: true,
        collection: COLLECTION_NAME,
    }
);

//Export the model
module.exports = model(DOCUMENT_NAME, feedbackSchema);
