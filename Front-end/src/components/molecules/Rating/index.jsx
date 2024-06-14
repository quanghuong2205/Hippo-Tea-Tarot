import PropTypes from 'prop-types';
import { roundNumber } from '../../../utils';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

function Rating({ rating, className, isShownScore = true }) {
    /** Round the rating score
        ex:
            + 3.45 will be rounded to 3.5
            + 3.89 will be rounded to 4
            + 3.24 will be rounded to 3

        Calculate the num of empty start, solid star
            and haflStar to render
            based on the ratingScore
    */
    const roundedRating = roundNumber({ num: rating });
    const remainder = roundedRating % 1;
    const hasHalfOfOne = remainder !== 0;

    const emptyStar =
        roundedRating === 5
            ? undefined
            : hasHalfOfOne
            ? 4.5 - roundedRating
            : 5 - roundedRating;
    return (
        <div className={className}>
            {Array(Math.floor(roundedRating))
                .fill(1)
                .map((_, i) => (
                    <FaStar key={`solid/${i}`} />
                ))}
            {hasHalfOfOne && <FaStarHalfAlt />}
            {emptyStar &&
                Array(emptyStar)
                    .fill(1)
                    .map((_, i) => <FaRegStar key={`empty/${i}`} />)}

            {isShownScore && (
                <span className='score'>
                    {roundedRating !== 0 ? roundedRating : 0}
                </span>
            )}
        </div>
    );
}

Rating.propTypes = {
    rating: PropTypes.number,
    className: PropTypes.string,
    isShownScore: PropTypes.bool,
};

export default Rating;
