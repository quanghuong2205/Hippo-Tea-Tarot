import PropTypes from 'prop-types';
import ReviewQuality from './Quality';
import ReviewForm from './Form';
import MediaLoading from '../../../loaders/MediaLoading';
import {
    useDeleteFeedback,
    useUpdateFeedback,
} from '../../../../queries/useFeedback';
import useMultipartForm from '../../../../hooks/useMultipartForm';
import { REVIEW_FORM_FOR_UPDATE } from '../../../../constants/form.constant';
import { convertObjectToFormData } from '../../../../utils';
import { useEffect } from 'react';

function UpdateFeedback({ feedbackObject }) {
    const { form, setFormField, setRating, previewImages, removeFile } =
        useMultipartForm({
            FORM_FILEDS: REVIEW_FORM_FOR_UPDATE,
            initalFormValues: feedbackObject,
        });

    const {
        mutate: DFMutate,
        reset: DFReset,
        error: DFError,
        isLoading: DFIsLoading,
        isFinished: DFIsFinished,
    } = useDeleteFeedback();

    const {
        mutate: UFMutate,
        reset: UFReset,
        error: UFError,
        isLoading: UFIsLoading,
        isFinished: UFIsFinished,
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

    useEffect(() => {
        if (DFIsFinished) {
            return;
        }

        if (DFError) {
            DFReset();
            return;
        }
    }, [DFError, DFIsFinished, DFReset]);

    useEffect(() => {
        if (UFIsFinished) {
            return;
        }

        if (UFError) {
            UFReset();
            return;
        }
    }, [UFError, UFIsFinished, UFReset]);

    return (
        <div className='review-writer'>
            {(DFIsLoading || UFIsLoading) && (
                <MediaLoading
                    loadingText={
                        DFIsLoading ? 'Deleting...' : 'Updating...'
                    }
                    styles={{
                        bgColor: 'rgba(255, 255, 255, .6)',
                    }}
                />
            )}

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
