'use strict';
import images from '../images';

const FEED_REACTS = [
    {
        react: 'like',
        icon: images.like,
        label: 'Thích',
        color: '#046ee4',
    },

    {
        react: 'love',
        icon: images.love,
        label: 'Yêu thích',
        color: '#ea2445',
    },

    {
        react: 'lovelove',
        icon: images.lovelove,
        label: 'Thương thương',
        color: '#f7b94d',
    },

    {
        react: 'smile',
        icon: images.smile,
        label: 'Haha',
        color: '#fee96f',
    },

    {
        react: 'wow',
        icon: images.wow,
        label: 'Wow',
        color: '#fde36a',
    },

    {
        react: 'sad',
        icon: images.sad,
        label: 'Buồn',
        color: '#fbc754',
    },

    {
        react: 'angry',
        icon: images.angry,
        label: 'Phẫn nộ',
        color: '#e85b08',
    },
];

export default FEED_REACTS;
