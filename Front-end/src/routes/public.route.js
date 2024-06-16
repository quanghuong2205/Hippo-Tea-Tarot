'use strict';
import { lazy } from 'react';

import Home from '../pages/Home';

const ProductDetail = lazy(() => import('../pages/ProductDetail'));
const Profile = lazy(() => import('../pages/Profile'));
const Menu = lazy(() => import('../pages/Menu'));

import MainLayout from '../layouts/MainLayout';
import SidebarLayout from '../layouts/SidebarLayout';

const publicRoutes = [
    {
        path: '/',
        layout: SidebarLayout,
        element: Home,
        title: 'Home',
    },

    {
        path: '/menu',
        layout: MainLayout,
        element: Menu,
        title: 'Menu',
    },

    {
        path: '/product-detail/:cat/:id',
        layout: MainLayout,
        element: ProductDetail,
        title: 'Product Detail',
    },

    {
        path: '/profile/:id',
        element: Profile,
        title: 'Profile',
    },
];

export default publicRoutes;
