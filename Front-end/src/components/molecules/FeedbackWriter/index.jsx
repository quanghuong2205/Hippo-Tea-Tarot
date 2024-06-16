import PropTypes from 'prop-types';
import CreateFeedback from './_components/CreateFeedback';
import UpdateFeedback from './_components/UpdateFeedback';
import 'react-toastify/dist/ReactToastify.css';
function FeedbackWriter({ data }) {
    if (data.feedback) {
        return (
            <UpdateFeedback
                feedbackObject={data.feedback}
                productID={data.productID}
            />
        );
    }

    return <CreateFeedback productID={data.productID} />;
}

FeedbackWriter.propTypes = {
    data: PropTypes.object,
};

export default FeedbackWriter;
