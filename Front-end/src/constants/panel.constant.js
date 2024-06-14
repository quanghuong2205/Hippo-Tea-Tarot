'use strict';

import Search from '../components/molecules/Search';
import Notify from '../components/molecules/Notify';
import Filter from '../components/molecules/Filter';
import MobileNavBar from '../components/mobile/Navbar';

const PANEL_TITLES = {
    SEARCH_PANEL: 'search-panel',
    NOTIFY_PANEL: 'notify-panel',
    HEADER_MOBILE_PANEL: 'header-mobile-panel',
    FILTER_PANEL: 'filter-panel',
};

const PANELS = {
    [PANEL_TITLES.SEARCH_PANEL]: {
        component: Search,
        direction: 'fromLeft',
        outOfDOM: true,
    },
    [PANEL_TITLES.NOTIFY_PANEL]: {
        component: Notify,
        direction: 'fromLeft',
        outOfDOM: true,
    },
    [PANEL_TITLES.HEADER_MOBILE_PANEL]: {
        component: MobileNavBar,
        direction: 'fromLeft',
        outOfDOM: true,
    },
    [PANEL_TITLES.FILTER_PANEL]: {
        component: Filter,
        direction: 'fromRight',
        outOfDOM: false,
    },
};

export { PANEL_TITLES, PANELS };
