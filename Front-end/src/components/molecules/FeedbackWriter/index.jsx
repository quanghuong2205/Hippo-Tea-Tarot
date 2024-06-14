import PropTypes from 'prop-types';
import CreateFeedback from './_components/CreateFeedback';
import UpdateFeedback from './_components/UpdateFeedback';
import 'react-toastify/dist/ReactToastify.css';
function FeedbackWriter({ userFeedback, productID }) {
    if (userFeedback) {
        return (
            <UpdateFeedback
                feedbackObject={userFeedback}
                productID={productID}
            />
        );
    }

    return <CreateFeedback productID={productID} />;
}

FeedbackWriter.propTypes = {
    userFeedback: PropTypes.object,
    productID: PropTypes.string,
};

export default FeedbackWriter;
