'use strict';
'use strict';

const { Schema, model } = require('mongoose');

const COLLECTION_NAME = 'Discounts';
const DOCUMENT_NAME = 'Discount';

// Declare the Schema of the Mongo model
const discountSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },

        desc: {
            type: String,
            required: true,
        },

        type: {
            type: String,
            required: true,
            enum: {
                values: ['percentage', 'fixed-amount'],
                message: 'The discount type [{VALUE}] not valid].}',
            },
        },

        value: {
            type: Number,
            required: true,
        },

        /* Max price to discount */
        max_value_limit: {
            type: Number,
            required: true,
        },

        code: {
            type: String,
            required: true,
        },

        start_time: {
            type: Date,
            required: true,
        },

        end_time: {
            type: Date,
            required: true,
        },

        /*  Number of uses for the discount */
        max_use: {
            type: Number,
            required: true,
        },

        /*  Max number of uses for each user */
        max_per_user: {
            type: Number,
            default: 1,
        },

        /* Total number of uses */
        use_count: {
            type: Number,
            default: 0,
        },

        /* Users has used the discount */
        users_used: {
            type: Array,
            default: [],
        },

        /* The criterias of products which the discount will be applied to */
        apply_criteria: [
            {
                type: {
                    type: String,
                    required: true,
                    enum: {
                        values: [
                            'category',
                            'threshold_per_product',
                            'threshold_total_amount',
                            'group_products',
                            'all_products',
                        ],
                        message:
                            'The criteria [{VALUE}] to apply discount is invalid.',
                    },
                },
                value: {
                    type: Schema.Types.Mixed,
                    required: true,
                },
                desc: {
                    type: String,
                },
            },
        ],

        /* The discount is active  */
        is_active: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
        collection: COLLECTION_NAME,
    }
);

//Export the model
module.exports = model(DOCUMENT_NAME, discountSchema);
