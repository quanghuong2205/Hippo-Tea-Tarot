import PropTypes from 'prop-types';
import ReviewQuality from './Quality';
import ReviewForm from './Form';
import { REVIEW_FORM_FOR_CREATION } from '../../../../constants/form.constant';
import { convertObjectToFormData } from '../../../../utils/index';
import { useCreateFeedback } from '../../../../queries/useFeedback';
import useMultipartForm from '../../../../hooks/useMultipartForm';
import MediaLoading from '../../../loaders/MediaLoading';
import { useEffect } from 'react';

function CreateFeedback({ productID }) {
    const { setFormField, form, setRating, previewImages, removeFile } =
        useMultipartForm({
            FORM_FILEDS: REVIEW_FORM_FOR_CREATION,
        });

    /**
     * Send request
     */
    const {
        mutate: CFMutate,
        reset: CFReset,
        error: CFError,
        isLoading: CFIsLoading,
        isFinished: CFIsFinished,
    } = useCreateFeedback();

    const handleSubmitForm = () => {
        const formData = convertObjectToFormData({
            obj: form,
        });
        for (const [key, value] of formData.entries()) {
            console.log(key, value);
        }
        CFMutate({
            formData,
            productID,
        });
    };

    useEffect(() => {
        if (CFIsFinished) {
            return;
        }

        if (CFError) {
            CFReset();
            return;
        }
    }, [CFIsFinished, CFError, CFReset]);

    return (
        <div className='review-writer'>
            {CFIsLoading && (
                <MediaLoading
                    loadingText='Sending...'
                    styles={{
                        bgColor: 'rgba(255, 255, 255, .6)',
                    }}
                />
            )}
            <ReviewQuality
                choosenRating={form[REVIEW_FORM_FOR_CREATION.RATING.name]}
                setChoosenRating={setRating}
            />
            <ReviewForm
                setFormField={setFormField}
                handleSubmit={handleSubmitForm}
                previewImages={previewImages}
                REVIEW_FORM_FILEDS={REVIEW_FORM_FOR_CREATION}
                reviewForm={form}
                removeFile={removeFile}
                formType={'create'}
            />
        </div>
    );
}

CreateFeedback.propTypes = {
    productID: PropTypes.string,
    showToast: PropTypes.func,
};

export default CreateFeedback;
