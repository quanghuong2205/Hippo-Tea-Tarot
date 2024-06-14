import PropTypes from 'prop-types';
import { IoCamera } from 'react-icons/io5';
import { memo } from 'react';
import InputBox from '../../../atoms/InputBox';
import PreviewImages from './PreviewImages';
const ReviewForm = memo(function ReviewForm({
    setFormField,
    handleSubmit,
    previewImages,
    REVIEW_FORM_FILEDS,
    removeFile,
    reviewForm,
    handleDelete,
    formType = 'update',
}) {
    return (
        <div className='review-form'>
            <h4 className='review__sub-title'>Mẫu đánh giá</h4>
            <div className='review-form__content'>
                {REVIEW_FORM_FILEDS?.TITLE && (
                    <InputBox
                        hasLabel
                        labelTitle={'Tiêu đề đánh giá'}
                        value={reviewForm[REVIEW_FORM_FILEDS.TITLE.name]}
                        placeholder={'Tiêu đề bài đánh giá của bạn...'}
                        onChange={(e) =>
                            setFormField({
                                fieldName: REVIEW_FORM_FILEDS.TITLE.name,
                                type: REVIEW_FORM_FILEDS.TITLE.type,
                            })(e.target.value)
                        }
                        classNames={{
                            label: 'review-form__title',
                            input: '',
                            wrap: 'review-form__group',
                        }}
                    />
                )}

                {REVIEW_FORM_FILEDS?.CONTENT && (
                    <InputBox
                        hasLabel
                        labelTitle={'Nội dung đánh giá'}
                        value={reviewForm[REVIEW_FORM_FILEDS.CONTENT.name]}
                        placeholder={
                            'Hãy chia sẻ suy nghĩ của bạn về sản phẩm, dịch vụ với những người khác...'
                        }
                        onChange={(e) =>
                            setFormField({
                                fieldName: REVIEW_FORM_FILEDS.CONTENT.name,
                                type: REVIEW_FORM_FILEDS.CONTENT.type,
                            })(e.target.value)
                        }
                        classNames={{
                            label: 'review-form__title',
                            input: '',
                            wrap: 'review-form__group full',
                        }}
                        isTextArea
                    />
                )}

                {REVIEW_FORM_FILEDS?.FILES && (
                    <div className='review-form__group'>
                        <PreviewImages
                            removeFile={removeFile}
                            previewImages={previewImages}
                        />

                        <InputBox
                            hasLabel
                            LabelIcon={IoCamera}
                            labelTitle={'Thêm ảnh'}
                            type='file'
                            onChange={(e) =>
                                setFormField({
                                    fieldName:
                                        REVIEW_FORM_FILEDS.FILES.name,
                                    type: REVIEW_FORM_FILEDS.FILES.type,
                                })([...e.target.files])
                            }
                            classNames={{
                                label: 'review-form__media',
                                input: '',
                                wrap: 'review-form__group',
                            }}
                            inputProps={{
                                hidden: true,
                                multiple: true,
                                accept: 'image/*, video/*',
                            }}
                        />
                    </div>
                )}
            </div>

            <div className='review-form__acts'>
                <button
                    onClick={handleSubmit}
                    type='button'
                    className='review-form__act pri-btn'>
                    {formType === 'update' ? 'Cập nhập' : 'Gửi'}
                </button>

                {formType === 'update' && (
                    <button
                        onClick={handleDelete}
                        type='button'
                        className='review-form__act pri-btn'>
                        Xóa
                    </button>
                )}
            </div>
        </div>
    );
});

ReviewForm.propTypes = {
    setFormField: PropTypes.func,
    handleDelete: PropTypes.func,
    handleSubmit: PropTypes.func,
    removeFile: PropTypes.func,
    previewImages: PropTypes.array,
    REVIEW_FORM_FILEDS: PropTypes.object,
    formType: PropTypes.string,
    feedbackObject: PropTypes.object,
    reviewForm: PropTypes.object,
};

export default ReviewForm;
