import PropTypes from 'prop-types';
import { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { clsx } from 'clsx';
import { RATING } from '../constants';
import { createRandomArray } from '../../../../utils';

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
                    {createRandomArray({ size: 5 }).map((id, i) => (
                        <div
                            key={id}
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
