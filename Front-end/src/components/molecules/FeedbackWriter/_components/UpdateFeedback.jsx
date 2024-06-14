import PropTypes from 'prop-types';
import ReviewQuality from './Quality';
import ReviewForm from './Form';

import {
    useDeleteFeedback,
    useUpdateFeedback,
} from '../../../../queries/useFeedback';
import useMultipartForm from '../../../../hooks/useMultipartForm';
import { REVIEW_FORM_FOR_UPDATE } from '../../../../constants/form.constant';
import { convertObjectToFormData } from '../../../../utils';

function UpdateFeedback({ feedbackObject }) {
    const { form, setFormField, setRating, previewImages, removeFile } =
        useMultipartForm({
            FORM_FILEDS: REVIEW_FORM_FOR_UPDATE,
            initalFormValues: feedbackObject,
        });

    const {
        mutate: DFMutate,
        isSuccess: DFIsSuccess,
        reset: DFReset,
        error: DFError,
    } = useDeleteFeedback();

    const {
        mutate: UFMutate,
        isSuccess: UFIsSuccess,
        reset: UFReset,
        error: UFError,
    } = useUpdateFeedback();

    const handleSubmitForm = () => {
        const formData = convertObjectToFormData({
            obj: form,
        });

        UFMutate({
            formData,
            id: feedbackObject._id,
        });
    };

    const handleDelete = () => {
        DFMutate({
            id: feedbackObject._id,
        });
    };

    return (
        <div className='review-writer'>
            <ReviewQuality
                choosenRating={form[REVIEW_FORM_FOR_UPDATE.RATING.name]}
                setChoosenRating={setRating}
            />
            <ReviewForm
                setFormField={setFormField}
                handleSubmit={handleSubmitForm}
                previewImages={previewImages}
                REVIEW_FORM_FILEDS={REVIEW_FORM_FOR_UPDATE}
                removeFile={removeFile}
                reviewForm={form}
                handleDelete={handleDelete}
            />
        </div>
    );
}

UpdateFeedback.propTypes = {
    feedbackObject: PropTypes.object,
};

export default UpdateFeedback;
