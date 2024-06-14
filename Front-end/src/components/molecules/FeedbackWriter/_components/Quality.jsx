import PropTypes from 'prop-types';
import { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { clsx } from 'clsx';
import { RATING } from '../constants';

const prefixs = {
    0: 'A',
    1: 'B',
    2: 'C',
    3: 'D',
    4: 'E',
};

function ReviewQuality({ choosenRating, setChoosenRating }) {
    const [hoverStarIndex, setHoverStarIndex] = useState(0);

    const setHoverIndex = (index) => () => {
        setHoverStarIndex(index);
    };

    return (
        <div className='review-quality'>
            <h4 className='review__sub-title'>Chất lượng sản phẩm</h4>
            <div className='review-quality__content'>
                <div className='review-quality__stars'>
                    {Array(5)
                        .fill(1)
                        .map((v, i) => (
                            <div
                                key={`${prefixs[i]}/review-star}`}
                                className={clsx({
                                    'review-quality__star': true,
                                    active:
                                        i + 1 <= hoverStarIndex ||
                                        i + 1 <= choosenRating,
                                })}
                                onMouseEnter={setHoverIndex(i + 1)}
                                onMouseLeave={setHoverIndex(0)}
                                onClick={setChoosenRating(i + 1)}>
                                <FaStar />
                            </div>
                        ))}
                </div>
                <span className='review-quality__level'>
                    {RATING[choosenRating]}
                </span>
            </div>
        </div>
    );
}

ReviewQuality.propTypes = {
    choosenRating: PropTypes.number,
    setChoosenRating: PropTypes.func,
};

export default ReviewQuality;
