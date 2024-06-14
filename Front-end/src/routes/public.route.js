'use strict';
import Home from '../pages/Home';
import Menu from '../pages/Menu';
import ProductDetail from '../pages/ProductDetail';
import Profile from '../pages/Profile';
import MainLayout from '../layouts/MainLayout';
import SidebarLayout from '../layouts/SidebarLayout';

const publicRoutes = [
    {
        path: '/',
        layout: SidebarLayout,
        element: Home,
    },

    {
        path: '/menu',
        layout: MainLayout,
        element: Menu,
    },

    {
        path: '/product-detail/:cat/:id',
        layout: MainLayout,
        element: ProductDetail,
    },

    {
        path: '/profile/:id',
        element: Profile,
    },
];

export default publicRoutes;
