'use strict';
'use strict';

const { Schema, model } = require('mongoose');

const COLLECTION_NAME = 'Keys';
const DOCUMENT_NAME = 'Key';

// Declare the Schema of the Mongo model
const keySchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },

        public_key: {
            type: String,
            required: true,
        },

        private_key: {
            type: String,
            required: true,
        },

        refresh_token: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
        collection: COLLECTION_NAME,
    }
);

//Export the model
module.exports = model(DOCUMENT_NAME, keySchema);
