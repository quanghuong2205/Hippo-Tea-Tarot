'use strict';
import { lazy } from 'react';

const Filter = lazy(() => import('../components/molecules/Filter'));
// const MobileNavBar = lazy(() => import('../components/mobile/Navbar'));
const Notify = lazy(() => import('../components/molecules/Notify'));
const Search = lazy(() => import('../components/molecules/Search'));
const FeedbackWriter = lazy(() =>
    import('../components/molecules/FeedbackWriter')
);
// const AuthModal = lazy(() => import('../components/modals/AuthModal'));

import MobileNavBar from '../components/mobile/Navbar';
import AuthModal from '../components/modals/AuthModal';

const MODAL_TITLES = {
    SEARCH_MODAL: 'search-modal',
    NOTIFY_MODAL: 'notify-modal',
    HEADER_MOBILE_MODAL: 'header-mobile-modal',
    FILTER_MODAL: 'filter-modal',
    AUTH_INFOR_MODAL: 'auth-infor-modal',
    FEEDBACK_WRITER_MODAL: 'feedback-writer-modal',
};

const MODALS = {
    [MODAL_TITLES.SEARCH_MODAL]: {
        component: Search,
        position: 'leftEdge',
        isVertical: true,
        outOfDOM: true,
    },
    [MODAL_TITLES.NOTIFY_MODAL]: {
        component: Notify,
        position: 'leftEdge',
        isVertical: true,
        outOfDOM: true,
    },
    [MODAL_TITLES.HEADER_MOBILE_MODAL]: {
        component: MobileNavBar,
        position: 'leftEdge',
        isVertical: true,
        outOfDOM: true,
    },
    [MODAL_TITLES.FILTER_MODAL]: {
        component: Filter,
        position: 'rightEdge',
        isVertical: true,
        outOfDOM: false,
    },

    [MODAL_TITLES.AUTH_INFOR_MODAL]: {
        component: AuthModal,
        position: '',
        isVertical: false,
        outOfDOM: true,
    },

    [MODAL_TITLES.FEEDBACK_WRITER_MODAL]: {
        component: FeedbackWriter,
        position: '',
        isVertical: false,
        outOfDOM: true,
    },
};

export { MODAL_TITLES, MODALS };
