import { useState } from 'react';
import EVENTS from '../constants/event.constant';
import {
    dispatchEvent,
    extractFromLocalstorage,
    saveToLocalstorage,
} from '../utils';
import STORAGE_KEYS from '../constants/storage-key.constant';

function useFilter() {
    const [activeNodeIds, setActiveNodeIds] = useState(() => {
        const filterState = extractFromLocalstorage({
            key: STORAGE_KEYS.PRODUCT_FILTER_STATE,
        });

        return filterState ? filterState : { input: [], span: null };
    });

    const handleNodeId = ({ id, type }) => {
        setActiveNodeIds((prev) => {
            /* Input Node Type */
            if (type === 'input') {
                prev[type] = !prev[type].includes(id)
                    ? [...prev[type], id]
                    : prev[type].filter((i) => i !== id);
            }

            /* Span Node Type */
            if (type === 'span') {
                prev[type] = prev.span === id ? null : id;
            }

            saveToLocalstorage({
                key: STORAGE_KEYS.PRODUCT_FILTER_STATE,
                data: prev,
            });
            return { ...prev };
        });
    };

    /**
     * @desc Handle set params
     */
    const setMultiValueQueryString = ({ queryObject, isChoosen }) => {
        dispatchEvent({
            eventName: EVENTS.SET_SEARCH_PARAM_FOR_MULTI_FIELD,
            payload: {
                queryObject,
                isChoosen,
            },
        });
    };

    /**
     * @desc Handle set params
     */
    const setSingleValueQueryString = ({ queryObject }) => {
        dispatchEvent({
            eventName: EVENTS.SET_SEARCH_PARAM_FOR_SINGLE_FIELD,
            payload: {
                queryObject,
            },
        });
    };

    /**
     * @desc Handle reset filter
     */
    const handleResetFilter = () => {
        /* Reset all filter label state */
        setActiveNodeIds({
            input: [],
            span: null,
        });

        /* Reset params */
        dispatchEvent({
            eventName: EVENTS.RESET_SEARCH_PARAMS,
            payload: {},
        });
    };

    return {
        activeNodeIds,
        setMultiValueQueryString,
        setSingleValueQueryString,
        handleResetFilter,
        handleNodeId,
    };
}

export default useFilter;
