'use strict';
require('dotenv').config();

const DEV_ENV = {
    APP: {
        PORT: process.env.DEV_PORT,
        DOMAIN: process.env.DEV_DOMAIN,
        PROTOCOL: process.env.DEV_PROTOCOL,
    },

    DATABASE: {
        PROTOCOL: process.env.DEV_DB_PROTOCOL,
        DOMAIN: process.env.DEV_DB_DOMAIN,
        PORT: process.env.DEV_DB_PORT,
        NAME: process.env.DEV_DB_NAME,
    },
};

module.exports = DEV_ENV;
