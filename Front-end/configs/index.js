'use strict';
const configs = {
    DEV: {
        BASE_URL_API: 'https://hippo-back-end-1.onrender.com/api/v1',
        SERVER_URL: 'https://hippo-back-end-1.onrender.com',
        // BASE_URL_API: 'http://192.168.121.103:3000/api/v1',
        // SERVER_URL: 'http://192.168.121.103:3000',
    },

    PRO: {},

    TEST: {},
};

const env = 'DEV';
const config = configs[env];

export default config;
