import { useEffect, useState } from 'react';
import EVENTS from '../constants/event.constant';

function useSearchParams({ filters = {} }) {
    const [searchParamObjects, setSearchParamObjects] = useState({
        limit: 8,
        page: 1,
        ...filters,
    });

    /**
     * @desc Save queryString
     */
    const setMultiValueQueryString = (e) => {
        const { queryObject, isChoosen } = e.detail;

        setSearchParamObjects((prev) => {
            const queryKeys = Object.keys(queryObject);

            /**
             * If queryObject is choosen (isChoosen = true)
             *      push queryObject to paramObjects
             * Ex:
             *      paramObjects = {
             *          x: [0, 1]
             *          y: [3, 4]
             *      }
             *
             *      queryObject = {
             *          x: 2,
             *          y: 5
             *      }
             *  => X, Y has been in paramObjects, so push to array
             *      paramObjects = {
             *          x: [0, 1, 2]
             *          y: [3, 4, 5]
             *      }
             */
            if (isChoosen) {
                queryKeys.forEach((key) => {
                    prev[key] = prev[key]
                        ? [...prev[key], queryObject[key]]
                        : [queryObject[key]];
                });
            }

            /**
             * If queryObject is removed (isChoosen = false)
             *      remove queryObject from paramObjects
             * Ex:
             *      paramObjects = {
             *          x: [0, 1]
             *          y: [3, 4]
             *      }
             *
             *      queryObject = {
             *          x: 1,
             *          y: 4
             *      }
             *  => X, Y has been in paramObjects, so remove
             *      paramObjects = {
             *          x: [0]
             *          y: [3]
             *      }
             */
            if (!isChoosen) {
                queryKeys.forEach((key) => {
                    if (!prev[key]) return;

                    prev[key] = prev[key].filter(
                        (v) => v != queryObject[key]
                    );

                    if (prev[key].length === 0) delete prev[key];
                });
            }

            console.log(prev);

            return {
                ...prev,
            };
        });
    };

    /**
     * @desc Save queryString
     */
    const setSingleValueQueryString = (e) => {
        const { queryObject } = e.detail;
        const queryKeys = Object.keys(queryObject);

        setSearchParamObjects((prev) => {
            queryKeys.forEach((key) => {
                if (prev[key] && prev[key][0] === queryObject[key]) {
                    return delete prev[key];
                }
                prev[key] = [queryObject[key]];
            });

            return { ...prev };
        });
    };

    /**
     * @desc Reset search params
     */
    const resetSearchParamObjects = () => {
        if (Object.keys(searchParamObjects).length !== 0) {
            setSearchParamObjects({
                limit: 8,
                page: 1,
            });
        }
    };

    /**
     * @desc Set page
     */
    const setPage = ({ page }) => {
        setSearchParamObjects((prev) => {
            return {
                ...prev,
                page,
            };
        });
    };

    useEffect(() => {
        window.addEventListener(
            EVENTS.SET_SEARCH_PARAM_FOR_MULTI_FIELD,
            setMultiValueQueryString
        );

        window.addEventListener(
            EVENTS.SET_SEARCH_PARAM_FOR_SINGLE_FIELD,
            setSingleValueQueryString
        );

        window.addEventListener(
            EVENTS.RESET_SEARCH_PARAMS,
            resetSearchParamObjects
        );

        return () => {
            window.removeEventListener(
                EVENTS.SET_SEARCH_PARAM_FOR_MULTI_FIELD,
                setMultiValueQueryString
            );

            window.removeEventListener(
                EVENTS.SET_SEARCH_PARAM_FOR_SINGLE_FIELD,
                setSingleValueQueryString
            );

            window.removeEventListener(
                EVENTS.RESET_SEARCH_PARAMS,
                resetSearchParamObjects
            );
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return {
        searchParamObjects,
        setPage,
    };
}

export default useSearchParams;
