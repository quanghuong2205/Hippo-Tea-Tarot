import PropTypes from 'prop-types';
import { useFeedbacks } from '../../queries/useFeedback';
import Button from '../../components/atoms/Button';
import FeedbackCard from '../../components/molecules/FeedbackCard';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { dispatchEvent } from '../../utils';
import EVENTS from '../../constants/event.constant';
import { MODAL_TITLES } from '../../constants/modal.constant';

function ProductFeedbacks({ productID }) {
    /* Router */
    const navigate = useNavigate();
    const location = useLocation();

    /* Auth state */
    const auth = useSelector((state) => state.auth);

    /* Fetch feedbacks of product */
    const { isFetching, isLoading, isSuccess, data } = useFeedbacks({
        productID,
        searchParamObjects: {
            limit: 50,
            page: 1,
        },
    });

    /* Get user feedback about product */
    const getFeedback = () => {
        const feedback = data.find((f) => f.user._id === auth.user._id);
        if (!feedback) return undefined;

        const clone = { ...feedback };
        clone['remain_thumbs'] = [...clone.thumbs];
        delete clone.thumbs;

        return clone;
    };

    /* Show feedback popup if user has been signed in */
    const showFeedbackPopup = () => {
        if (!auth.user) {
            navigate('/auth', {
                state: {
                    goBack: true,
                    redirectTo: location.pathname,
                },
            });
            return;
        }

        dispatchEvent({
            eventName: EVENTS.OPEN_MODAL,
            payload: {
                title: MODAL_TITLES.FEEDBACK_WRITER_MODAL,
                data: {
                    feedback: getFeedback(),
                    productID,
                },
            },
        });
    };

    return (
        <div className='product-detail__feedbacks'>
            <div className='product-feedback__menu'>
                <h3 className='product-feedback__title'>Reviews</h3>

                {!isFetching &&
                    !isLoading &&
                    isSuccess &&
                    data &&
                    data.map((f) => (
                        <FeedbackCard
                            key={`feedback/${f._id}`}
                            feedback={f}
                            userID={auth.user?._id}
                        />
                    ))}

                <Button
                    onClick={showFeedbackPopup}
                    className={'pri-btn review__act-btn'}>
                    <span>Leave your feedback</span>
                </Button>
            </div>
        </div>
    );
}

ProductFeedbacks.propTypes = {
    productID: PropTypes.string,
};

export default ProductFeedbacks;
