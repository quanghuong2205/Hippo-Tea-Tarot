'use strict';
import { lazy } from 'react';

const Filter = lazy(() => import('../components/molecules/Filter'));
const MobileNavBar = lazy(() => import('../components/mobile/Navbar'));
const Notify = lazy(() => import('../components/molecules/Notify'));
const Search = lazy(() => import('../components/molecules/Search'));
// const FeedbackWriter = lazy(() =>
//     import('../components/molecules/FeedbackWriter')
// );

import AuthModal from '../components/modals/AuthModal';
import LinkModal from '../components/modals/LinkModal';
import FeedbackWriter from '../components/molecules/FeedbackWriter';

const MODAL_IDS = {
    SEARCH_MODAL: '495b6262-18a8-433f-af65-af4a43e2dfc1',
    NOTIFY_MODAL: '58c2bf1d-719d-4b68-8adc-dc34be96a52d',
    HEADER_MOBILE_MODAL: 'd44d886a-e9c0-4a76-a958-c0d9c3e8626b',
    FILTER_MODAL: '756aaa7d-b37f-4905-9040-09d329806030',
    AUTH_INFOR_MODAL: 'af7a133a-350f-49c1-b158-db6076bd8e3d',
    FEEDBACK_WRITER_MODAL: 'e4e449fe-a6a1-4d64-b35d-96943caa3e6b',
    LINK_MODAL: 'e4e449fa-a6a1-4d63-b39d-96b43caa3e6c',
};

const MODALS = {
    [MODAL_IDS.SEARCH_MODAL]: {
        component: Search,
        position: 'leftEdge',
        isVertical: true,
        layer: 1,
    },
    [MODAL_IDS.NOTIFY_MODAL]: {
        component: Notify,
        position: 'leftEdge',
        isVertical: true,
        layer: 1,
    },
    [MODAL_IDS.HEADER_MOBILE_MODAL]: {
        component: MobileNavBar,
        position: 'leftEdge',
        isVertical: true,
        hasOverlay: true,
        layer: 1,
    },
    [MODAL_IDS.FILTER_MODAL]: {
        component: Filter,
        position: 'rightEdge',
        hasOverlay: true,
        layer: 1,
    },

    [MODAL_IDS.AUTH_INFOR_MODAL]: {
        component: AuthModal,
        isVertical: false,
        hasCloseButton: true,
        hasOverlay: true,
        layer: 1,
    },

    [MODAL_IDS.FEEDBACK_WRITER_MODAL]: {
        component: FeedbackWriter,
        hasOverlay: true,

        layer: 1,
    },

    [MODAL_IDS.LINK_MODAL]: {
        component: LinkModal,
        hasOverlay: true,
        layer: 1,
    },
};

export { MODAL_IDS, MODALS };
