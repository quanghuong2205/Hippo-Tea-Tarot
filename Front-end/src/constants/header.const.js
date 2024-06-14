'use strict';
import { AiFillHome } from 'react-icons/ai';
import { FaUser } from 'react-icons/fa';
import { IoFastFoodSharp } from 'react-icons/io5';
import { MdOutlineDarkMode } from 'react-icons/md';
import { FaRegNewspaper } from 'react-icons/fa6';
import { IoIosSettings } from 'react-icons/io';

const USER_MENU = [
    [
        {
            id: 'PF',
            icon: FaUser,
            isLink: true,
            label: 'Profile',
            path: '/profile',
        },

        {
            id: 'BL',
            icon: FaRegNewspaper,
            isLink: true,
            label: 'Blogs',
            path: '/blog',
        },
    ],

    [
        {
            id: 'ST',
            isLink: true,
            icon: IoIosSettings,
            label: 'Settings',
            path: '/settings',
        },
    ],
];

const NAV_LINKS = [
    {
        id: 'HO',
        label: 'Home',
        icon: AiFillHome,
        path: '/',
        isLink: true,
    },

    {
        id: 'MU',
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
            id: 'SA',
            icon: MdOutlineDarkMode,
            label: 'Switch apperance',
            isLink: false,
            sub: [
                [
                    {
                        id: 'DM',
                        label: 'Dark mode',
                        isLink: false,
                    },

                    {
                        id: 'LM',
                        label: 'Light mode',
                        isLink: false,
                    },
                ],
            ],
        },
    ],
];

export { USER_MENU, NAV_LINKS, MOBILE_MENU };
