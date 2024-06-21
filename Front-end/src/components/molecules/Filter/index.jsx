import { FaFilter } from 'react-icons/fa';
import { FILTERS } from './constant';
import useFilter from '../../../hooks/useFilter';
import FilterGroup from './_components/FilterGroup';

function Filter() {
    const {
        activeNodeIds,
        setMultiValueQueryString,
        setSingleValueQueryString,
        handleResetFilter,
        handleNodeId,
    } = useFilter();

    const filterKeys = Object.keys(FILTERS);
    return (
        <div className='filter'>
            <h4 className='filter-title'>
                <FaFilter />
                Bộ lọc sản phẩm
            </h4>

            <div className='filter-body'>
                {filterKeys.map((key) => (
                    <FilterGroup
                        key={FILTERS[key].title}
                        filterKey={key}
                        items={FILTERS[key].body}
                        isMultipleChoice={FILTERS[key].isMultiple}
                        handleNodeId={handleNodeId}
                        activeNodeIds={activeNodeIds}
                        setMultiValueQueryString={setMultiValueQueryString}
                        setSingleValueQueryString={
                            setSingleValueQueryString
                        }
                    />
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
