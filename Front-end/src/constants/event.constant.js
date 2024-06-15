'use strict';
const EVENTS = {
    /* Auth */
    SIGN_UP_SUCCESS: 'sign-up-success',

    /* Panels */
    OPEN_PANEL: 'open-panel',
    HIDDEN_PANEL: 'hidden-panel',
    SHOW_INVISIBLE_PANEL: 'show-invisible-panel',

    /* Filter */
    SET_SEARCH_PARAM_FOR_MULTI_FIELD: 'search-params-for-multi-field',
    SET_SEARCH_PARAM_FOR_SINGLE_FIELD: 'search-params-for-single-field',
    RESET_SEARCH_PARAMS: 'reset-search-params',

    /* Tooltip */
    TOOLTIP_HIDDEN: 'tooltip-hidden',
};

export default EVENTS;
