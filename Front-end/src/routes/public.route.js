'use strict';
import { lazy } from 'react';

import HomePage from '../pages/HomePage';

const ProductDetailPage = lazy(() => import('../pages/ProductDetailPage'));
const ProfilePage = lazy(() => import('../pages/ProfilePage'));
const ProductPage = lazy(() => import('../pages/ProductPage'));

import MainLayout from '../layouts/MainLayout';
import SidebarLayout from '../layouts/SidebarLayout';

const publicRoutes = [
    {
        path: '/',
        layout: SidebarLayout,
        element: HomePage,
        title: 'Home',
    },

    {
        path: '/menu',
        layout: MainLayout,
        element: ProductPage,
        title: 'Menu',
    },

    {
        path: '/product-detail/:cat/:id',
        layout: MainLayout,
        element: ProductDetailPage,
        title: 'Product Detail',
    },

    {
        path: '/profilePage/:id',
        element: ProfilePage,
        title: 'ProfilePage',
    },
];

export default publicRoutes;
