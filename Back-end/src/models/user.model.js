'use strict';
const { Schema, model } = require('mongoose');

const COLLECTION_NAME = 'Users';
const DOCUMENT_NAME = 'User';

// Declare the Schema of the Mongo model
const userSchema = new Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true,
        },

        email: {
            type: String,
            trim: true,
            required: true,
        },

        password: {
            type: String,
            trim: true,
        },

        avatar: {
            type: String,
            trim: true,
            default: 'assets/avatar/placeholder.jpg',
        },

        status: {
            type: String,
            enum: ['pending', 'active', 'blocked'],
            default: 'active',
        },

        isEmailVerified: {
            type: Boolean,
            default: false,
        },

        role: {
            type: String,
            enum: ['user', 'admin'],
            default: 'user',
        },
    },
    {
        timestamps: true,
        collection: COLLECTION_NAME,
    }
);

/* Hash password presave to the db */
const bcrypt = require('bcrypt');
userSchema.pre('save', async function (next) {
    const salt = 10;
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
});

//Export the model
module.exports = model(DOCUMENT_NAME, userSchema);
