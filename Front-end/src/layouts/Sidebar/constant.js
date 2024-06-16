'use strict';
import SearchIcon from '../../components/icons/SearchIcon';
import HeartIcon from '../../components/icons/HeartIcon';
import { MODAL_TITLES } from '../../constants/modal.constant';

const SIDEBAR_ITEMS = [
    {
        icon: SearchIcon,
        title: 'Tìm kiếm',
        panelTitle: MODAL_TITLES.SEARCH_MODAL,
    },

    {
        icon: HeartIcon,
        title: 'Thông báo',
        panelTitle: MODAL_TITLES.NOTIFY_MODAL,
    },
];

export { SIDEBAR_ITEMS };
