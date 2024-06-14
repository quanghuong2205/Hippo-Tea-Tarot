'use strict';

const QUERY_KEYS = {
    AUTH_SIGN_IN_KEY: 'key/auth/signin',
    AUTH_SIGN_UP_KEY: 'key/auth/signup',

    PRODUCTS_PUBLISH_KEY: 'key/products/publish',
    PRODUCT_PUBLISH_BY_CAT_KEY: 'key/product-by-cat',
    PRODUCT_PUBLISH_KEY: 'key/product/publish',

    FEEDBACK_ALL_KEY: 'key/feedback/all',
    FEEDBACK_SINGLE_KEY: 'key/feedback/single',
};

const MUTATE_KEYS = {
    FEEDBACK_UPDATE_REPLY: 'key/feedback/update-reply',
    FEEDBACK_CREATE: 'key/feedback/create',
    FEEDBACK_UPDATE: 'key/feedback/update',
    FEEDBACK_DELETE: 'key/feedback/delete',
    FEEDBACK_LIKE: 'key/feedback/like',
    FEEDBACK_UNLIKE: 'key/feedback/unlike',
};

export { QUERY_KEYS, MUTATE_KEYS };
