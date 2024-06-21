'use strict';
import SearchIcon from '../../components/icons/SearchIcon';
import HeartIcon from '../../components/icons/HeartIcon';
import { MODAL_IDS } from '../../constants/modal.constant';

const SIDEBAR_ITEMS = [
    {
        icon: SearchIcon,
        title: 'Tìm kiếm',
        modelID: MODAL_IDS.SEARCH_MODAL,
    },

    {
        icon: HeartIcon,
        title: 'Thông báo',
        modelID: MODAL_IDS.NOTIFY_MODAL,
        iconColor: 'red',
    },
];

export { SIDEBAR_ITEMS };
