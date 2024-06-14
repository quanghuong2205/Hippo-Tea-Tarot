'use strict';
import SearchIcon from '../../components/icons/SearchIcon';
import HeartIcon from '../../components/icons/HeartIcon';
import { PANEL_TITLES } from '../../constants/panel.constant';

const SIDEBAR_ITEMS = [
    {
        icon: SearchIcon,
        title: 'Tìm kiếm',
        panelTitle: PANEL_TITLES.SEARCH_PANEL,
    },

    {
        icon: HeartIcon,
        title: 'Thông báo',
        panelTitle: PANEL_TITLES.NOTIFY_PANEL,
    },
];

export { SIDEBAR_ITEMS };
