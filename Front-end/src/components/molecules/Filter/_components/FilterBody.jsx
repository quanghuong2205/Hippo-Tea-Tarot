import PropTypes from 'prop-types';
import FilterLabel from './FilterLabel';
import { clsx } from 'clsx';

function FilterBody({
    filterGroup,
    filterKey,
    toggleLabelState,
    choosenInputLabels,
    choosenSpanLabel,
    setMultiValueQueryString,
    setSingleValueQueryString,
}) {
    const filterBody = filterGroup.body;

    return (
        <div className='filter-group__body'>
            {/*Filter multiple or single value for each key  */}
            {filterBody.map((item, i) =>
                filterGroup.isMultiple ? (
                    <div
                        key={`${filterKey}/${i}`}
                        className={clsx({
                            'form__checkbox-input': true,
                            'filter-group__item': true,
                            checked: choosenInputLabels.find(
                                (l) => l.id === `${filterKey}/${i}`
                            ),
                        })}>
                        <label>
                            <input
                                type='checkbox'
                                hidden
                                onChange={(event) => {
                                    toggleLabelState({
                                        id: `${filterKey}/${i}`,
                                        type: 'input',
                                        ref: event.target,
                                    });
                                    setMultiValueQueryString({
                                        queryObject: item.queryObject,
                                        isChoosen: event.target.checked,
                                    });
                                }}
                            />
                            <span className='form__checkbox-input__custom'></span>
                            <FilterLabel
                                filterKey={filterKey}
                                item={item}
                            />
                        </label>
                    </div>
                ) : (
                    <div
                        key={`${filterKey}/${i}`}
                        className={clsx({
                            'filter-group__item': true,
                            active:
                                choosenSpanLabel === `${filterKey}/${i}`,
                        })}
                        onClick={() => {
                            toggleLabelState({
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
    );
}

FilterBody.propTypes = {
    filterGroup: PropTypes.object,
    filterKey: PropTypes.string,
    toggleLabelState: PropTypes.func,
    choosenInputLabels: PropTypes.array,
    choosenSpanLabel: PropTypes.string,
    setMultiValueQueryString: PropTypes.func,
    setSingleValueQueryString: PropTypes.func,
};

export default FilterBody;
