import PropTypes from 'prop-types';
import AdminResponse from './_components/AdminResponse';
import config from '../../../../configs';
import Rating from '../Rating';
import ThreeDotsIcon from '../../icons/ThreeDotsIcon';
import LikeButton from './_components/LikeButton';

function FeedbackCard({ feedback, userID }) {
    return (
        <div className='review-card'>
            <div className='review-card__top'>
                <div className='review-card__user'>
                    <div
                        className='review-card__avatar'
                        style={{
                            background: 'red',
                        }}>
                        <img
                            src={`${config.SERVER_URL}/${feedback.user.avatar}`}
                            alt=''
                        />
                    </div>
                </div>

                <div className='review-card__infor'>
                    <span className='review-card__name'>
                        {feedback.user.name}
                    </span>

                    <Rating
                        rating={feedback.rating_star}
                        className={'review-card__stars'}
                        isShownScore={false}
                    />

                    <span className='review-card__time'>
                        2024-03-30 15:42
                    </span>

                    {/* feedback.title */}

                    {feedback.title !== '' && (
                        <p className='review-card__title'>
                            {feedback.title}
                        </p>
                    )}

                    {feedback.comment !== '' && (
                        <p className='review-card__content'>
                            {feedback.comment}
                        </p>
                    )}

                    {feedback.thumbs.length !== 0 && (
                        <div className='review-card__images'>
                            {feedback.thumbs.map((thumbUrl) => (
                                <div
                                    className='review-card__image'
                                    key={`${thumbUrl}`}>
                                    <img
                                        src={`${config.SERVER_URL}/${thumbUrl}`}
                                        alt=''
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {feedback.reply !== '' && (
                <AdminResponse
                    reply={feedback.reply}
                    user={feedback.user}
                    feedbackID={feedback._id}
                />
            )}

            <div className='review-card__bottom'>
                <LikeButton
                    hasLike={feedback.likes.includes(userID)}
                    feedbackID={feedback?._id}
                    totalLikes={feedback.likes.length}
                />

                <div className='review-card__options'>
                    <button className='review-card__option'>
                        <ThreeDotsIcon />
                    </button>
                </div>
            </div>
        </div>
    );
}

FeedbackCard.propTypes = {
    feedback: PropTypes.object,
    userID: PropTypes.string,
};

export default FeedbackCard;
