'use strict';
import { TiSocialFacebook } from 'react-icons/ti';
import { SiZalo } from 'react-icons/si';
import { IoLogoInstagram } from 'react-icons/io';
import { FaTwitter } from 'react-icons/fa';

const SOCIAL_LINKS = [
    {
        path: '/facebook',
        icon: TiSocialFacebook,
    },

    {
        path: '/zalo',
        icon: SiZalo,
    },

    {
        path: '/instagram',
        icon: IoLogoInstagram,
    },

    {
        path: '/twitter',
        icon: FaTwitter,
    },
];

export { SOCIAL_LINKS };
