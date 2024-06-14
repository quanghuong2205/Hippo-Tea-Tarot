import { FaFilter } from 'react-icons/fa';
import { FILTERS } from './constant';
import FilterBody from './_components/FilterBody';
import EVENTS from '../../../constants/event.constant';
import { useState } from 'react';
import { dispatchEvent } from '../../../utils';

function Filter() {
    const [choosenLabels, setChoosenLabels] = useState({
        input: [],
        span: null,
    });

    const toggleLabelState = ({ ref, id, type }) => {
        if (type === 'input') {
            setChoosenLabels((prev) => {
                const isChoosen = prev.input.find((l) => l.id === id);

                if (!isChoosen) {
                    prev[type].push({
                        node: ref,
                        id,
                    });
                }

                if (isChoosen) {
                    prev[type] = prev[type].filter((l) => l.id !== id);
                    ref.checked = false;
                }

                return { ...prev };
            });
        }

        if (type === 'span') {
            setChoosenLabels((prev) => {
                const isChoosen = prev.span === id;
                prev[type] = isChoosen ? null : id;

                return {
                    ...prev,
                };
            });
        }
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
        setChoosenLabels((prev) => {
            prev['input'].forEach((l) => {
                l.node.checked = false;
            });

            prev['input'] = [];
            prev['span'] = null;

            return { ...prev };
        });

        /* Reset params */
        dispatchEvent({
            eventName: EVENTS.RESET_SEARCH_PARAMS,
            payload: {},
        });
    };

    const filterKeys = Object.keys(FILTERS);
    return (
        <div className='filter'>
            <h4 className='filter-title'>
                <FaFilter />
                Bộ lọc sản phẩm
            </h4>

            <div className='filter-body'>
                {filterKeys.map((key) => (
                    <div
                        key={FILTERS[key].title}
                        className='filter-group'>
                        {/* Title */}
                        <p className='filter-group__title'>
                            {FILTERS[key].title}
                        </p>

                        {/* Body */}
                        <FilterBody
                            filterGroup={FILTERS[key]}
                            filterKey={key}
                            toggleLabelState={toggleLabelState}
                            choosenInputLabels={choosenLabels.input}
                            choosenSpanLabel={choosenLabels.span}
                            setMultiValueQueryString={
                                setMultiValueQueryString
                            }
                            setSingleValueQueryString={
                                setSingleValueQueryString
                            }
                        />
                    </div>
                ))}
            </div>

            <button
                className='pri-btn filter-reset'
                onClick={handleResetFilter}>
                Đặt lại bộ lọc
            </button>
        </div>
    );
}

export default Filter;
