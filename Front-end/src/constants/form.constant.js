'use strict';
const REVIEW_FORM_FOR_CREATION = {
    RATING: {
        name: 'rating_star',
        type: 'number',
    },
    TITLE: {
        name: 'title',
        type: 'string',
    },
    CONTENT: {
        name: 'comment',
        type: 'string',
    },
    FILES: {
        name: 'thumbs',
        type: 'fileArray',
    },
};

const REVIEW_FORM_FOR_UPDATE = {
    RATING: {
        name: 'rating_star',
        type: 'number',
    },
    TITLE: {
        name: 'title',
        type: 'string',
    },
    CONTENT: {
        name: 'comment',
        type: 'string',
    },
    FILES: {
        name: 'thumbs',
        type: 'fileArray',
    },

    FILE_URLS: {
        name: 'remain_thumbs',
        type: 'array',
    },
};

export { REVIEW_FORM_FOR_CREATION, REVIEW_FORM_FOR_UPDATE };
