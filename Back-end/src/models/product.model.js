'use strict';

const { Schema, model, Types } = require('mongoose');

const COLLECTION_NAME = 'Products';
const DOCUMENT_NAME = 'Product';

// Declare the Schema of the Mongo model
const productSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },

        category: {
            type: String,
            required: true,
            ref: 'Category',
        },

        slug: {
            type: String,
        },

        description: {
            type: String,
        },

        price: {
            type: Number,
            required: true,
            min: [0, 'The price must be above 0'],
        },

        tax: {
            type: Number,
            required: true,
            min: [0, 'The tax must be above 0'],
        },

        thumbs: {
            type: Array,
            default: [],
        },

        rating: {
            type: Number,
            default: 5,
            min: [0, 'Rating must be above 0'],
            max: [5, 'Rating must be less 5'],
        },

        is_draft: {
            type: Boolean,
            default: true,
            select: false,
        },

        is_public: {
            type: Boolean,
            default: false,
            select: false,
        },

        attributes: {
            type: Schema.Types.Mixed,
        },
    },
    {
        timestamps: true,
        collection: COLLECTION_NAME,
    }
);

/* Index */
productSchema.index({
    name: 'text',
    category: 'text',
    description: 'text',
});

//Export the model
module.exports = model(DOCUMENT_NAME, productSchema);
