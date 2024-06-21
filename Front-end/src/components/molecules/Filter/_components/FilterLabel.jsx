import PropTypes from 'prop-types';
import { FaStar } from 'react-icons/fa';
import { createRandomArray } from '../../../../utils';

function FilterLabel({ filterKey, item }) {
    if (filterKey === 'PRICE') {
        return (
            <span>
                {item.minPrice} - {item.maxPrice}
            </span>
        );
    }

    if (filterKey === 'RATING') {
        return (
            <span className='filter-group__rating'>
                {createRandomArray({ size: item.score }).map((id) => (
                    <FaStar key={id} />
                ))}
            </span>
        );
    }

    return <span>{item.label}</span>;
}

FilterLabel.propTypes = {
    filterKey: PropTypes.string,
    item: PropTypes.object,
};
export default FilterLabel;
