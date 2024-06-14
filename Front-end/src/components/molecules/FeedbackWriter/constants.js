'use strict';
const RATING = {
    1: 'Tệ',
    2: 'Không hài lòng',
    3: 'Bình thường',
    4: 'Hài lòng',
    5: 'Tuyệt vời',
};

const REVIEW_FORM_FILEDS_FOR_CREATE = {
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

const REVIEW_FORM_FILEDS_FOR_UPDATE = {
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

export {
    RATING,
    REVIEW_FORM_FILEDS_FOR_CREATE,
    REVIEW_FORM_FILEDS_FOR_UPDATE,
};
