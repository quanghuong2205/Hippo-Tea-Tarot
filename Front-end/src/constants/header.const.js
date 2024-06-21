'use strict';
import { AiFillHome } from 'react-icons/ai';
import { FaUser } from 'react-icons/fa';
import { IoFastFoodSharp } from 'react-icons/io5';
import { MdOutlineDarkMode } from 'react-icons/md';
import { FaRegNewspaper } from 'react-icons/fa6';
import { IoIosSettings } from 'react-icons/io';

const ITEM_IDS = {
    PROFILE: 'profile',
    BLOG: 'blog',
    SETTING: 'settings',
    HOME_LINK: 'home-link',
    MENU_LINK: 'menu-link',
    DARK_THEME: 'dark-theme',
    LIGHT_THEME: 'light-theme',
    SYSTEM_THEME: 'system-theme',
    SIGN_IN: 'sign-in',
    SIGN_OUT: 'sign-out',
};

const USER_MENU = [
    [
        {
            id: ITEM_IDS.PROFILE,
            icon: FaUser,
            isLink: true,
            label: 'Profile',
            path: '/profile',
        },

        {
            id: ITEM_IDS.BLOG,
            icon: FaRegNewspaper,
            isLink: true,
            label: 'Blogs',
            path: '/blog',
        },
    ],

    [
        {
            id: ITEM_IDS.SETTING,
            isLink: true,
            icon: IoIosSettings,
            label: 'Settings',
            path: '/settings',
        },
    ],
];

const NAV_LINKS = [
    {
        id: ITEM_IDS.HOME_LINK,
        label: 'Home',
        icon: AiFillHome,
        path: '/',
        isLink: true,
    },

    {
        id: ITEM_IDS.MENU_LINK,
        label: 'Menu',
        icon: IoFastFoodSharp,
        path: '/menu',
        isLink: true,
    },
];

const MOBILE_MENU = [
    [...USER_MENU[0]],
    [...NAV_LINKS],
    [
        ...USER_MENU[1],
        {
            id: 'Swicth-Apperance',
            icon: MdOutlineDarkMode,
            label: 'Switch apperance',
            isLink: false,
            sub: [
                [
                    {
                        id: ITEM_IDS.DARK_THEME,
                        label: 'Dark mode',
                        isLink: false,
                    },

                    {
                        id: ITEM_IDS.LIGHT_THEME,
                        label: 'Light mode',
                        isLink: false,
                    },

                    {
                        id: ITEM_IDS.SYSTEM_THEME,
                        label: 'System mode',
                        isLink: false,
                    },
                ],
            ],
        },
    ],
];

export { USER_MENU, NAV_LINKS, MOBILE_MENU, ITEM_IDS };
