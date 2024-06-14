import PropTypes from 'prop-types';
import { FaStar } from 'react-icons/fa';
import { createRandomArray } from '../../../../utils';

const prefixs = {
    1: 'A',
    2: 'B',
    3: 'C',
    4: 'D',
    5: 'E',
};

function FilterLabel({ filterKey, item }) {
    if (filterKey === 'PRICE') {
        return (
            <span className='filter-group__label'>
                {item.minPrice} - {item.maxPrice}
            </span>
        );
    }

    if (filterKey === 'RATING') {
        const arr = createRandomArray({ size: item.score });
        return (
            <span className='filter-group__rating'>
                {arr.map((v, i) => (
                    <FaStar key={`${prefixs[item.score]}/${i}}`} />
                ))}
            </span>
        );
    }

    return <span className='filter-group__label'>{item.label}</span>;
}

FilterLabel.propTypes = {
    filterKey: PropTypes.string,
    item: PropTypes.object,
};
export default FilterLabel;
