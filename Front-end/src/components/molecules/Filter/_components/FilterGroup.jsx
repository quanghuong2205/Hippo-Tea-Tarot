import PropTypes from 'prop-types';
import FilterLabel from './FilterLabel';
import clsx from 'clsx';
import CheckBoxInput from '../../../atoms/CheckboxInput';

function FilterGroup({
    items,
    title,
    filterKey,
    isMultipleChoice,
    handleNodeId,
    activeNodeIds,
    setMultiValueQueryString,
    setSingleValueQueryString,
}) {
    const { input: inputNodeIds, span: spanNodeId } = activeNodeIds;
    return (
        <div className='filter-group'>
            <p className='filter-group__title'>{title}</p>

            <div className='filter-group__body'>
                {items.map((item, i) =>
                    isMultipleChoice ? (
                        <div
                            key={`${filterKey}/${i}`}
                            className='filter-group__item'>
                            <CheckBoxInput
                                hasCheckedStateOutside
                                checked={inputNodeIds.includes(
                                    `${filterKey}/${i}`
                                )}
                                LabelComponent={() => (
                                    <FilterLabel
                                        filterKey={filterKey}
                                        item={item}
                                    />
                                )}
                                onChange={(event) => {
                                    handleNodeId({
                                        id: `${filterKey}/${i}`,
                                        type: 'input',
                                    });
                                    setMultiValueQueryString({
                                        queryObject: item.queryObject,
                                        isChoosen: event.target.checked,
                                    });
                                }}
                            />
                        </div>
                    ) : (
                        <div
                            key={`${filterKey}/${i}`}
                            className={clsx({
                                'filter-group__item': true,
                                active: spanNodeId === `${filterKey}/${i}`,
                            })}
                            onClick={() => {
                                handleNodeId({
                                    id: `${filterKey}/${i}`,
                                    type: 'span',
                                });
                                setSingleValueQueryString({
                                    queryObject: item.queryObject,
                                });
                            }}>
                            <FilterLabel
                                filterKey={filterKey}
                                item={item}
                            />
                        </div>
                    )
                )}
            </div>
        </div>
    );
}

FilterGroup.propTypes = {
    activeNodeIds: PropTypes.object,
    items: PropTypes.array,
    title: PropTypes.string,
    filterKey: PropTypes.string,
    handleNodeId: PropTypes.func,
    setMultiValueQueryString: PropTypes.func,
    setSingleValueQueryString: PropTypes.func,
    isMultipleChoice: PropTypes.bool,
};

export default FilterGroup;
