import PropTypes from 'prop-types';
import { useFeedbacks } from '../../queries/useFeedback';
import Button from '../../components/atoms/Button';
import FeedbackCard from '../../components/molecules/FeedbackCard';
import { useSelector } from 'react-redux';
import { createRandomArray, dispatchEvent } from '../../utils';
import EVENTS from '../../constants/event.constant';
import { MODAL_IDS } from '../../constants/modal.constant';
import FeedbackCardSkeleton from '../../components/molecules/FeedbackCard/FeedbackCardSkeleton';
import useRequireAuth from '../../hooks/useRequireAuth';

function ProductFeedbacks({ productID }) {
    const { requireSignIn } = useRequireAuth();

    /* Auth state */
    const auth = useSelector((state) => state.auth);

    /* Fetch feedbacks of product */
    const { isReady: FSIsReady, data: FSData } = useFeedbacks({
        productID,
        searchParamObjects: {
            limit: 50,
            page: 1,
        },
    });

    /* Get user feedback about product */
    const getFeedback = () => {
        const feedback = FSData.find((f) => f.user._id === auth.user._id);
        if (!feedback) return undefined;

        const clone = { ...feedback };
        clone['remain_thumbs'] = [...clone.thumbs];
        delete clone.thumbs;

        return clone;
    };

    /* Show feedback popup if user has been signed in */
    const showFeedbackPopup = () => {
        requireSignIn();

        dispatchEvent({
            eventName: EVENTS.OPEN_MODAL,
            payload: {
                title: MODAL_IDS.FEEDBACK_WRITER_MODAL,
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

                {FSIsReady
                    ? FSData.map((f) => (
                          <FeedbackCard
                              key={f._id}
                              feedback={f}
                          />
                      ))
                    : createRandomArray({ size: 2 }).map((id) => (
                          <FeedbackCardSkeleton key={id} />
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
