import PropTypes from 'prop-types';
import { memo } from 'react';
import { IoClose } from 'react-icons/io5';

const PreviewImages = memo(function PreviewImages({
    previewImages,
    removeFile,
}) {
    return (
        <>
            {previewImages.length !== 0 && (
                <div className='review-form__image-preview hidden-scrollbar'>
                    {previewImages.map((previewImage) => (
                        <div key={previewImage.url}>
                            <button
                                onClick={removeFile({
                                    url: previewImage.originUrl,
                                    file: previewImage?.file,
                                    type: previewImage.type,
                                })}>
                                <IoClose />
                            </button>
                            <img
                                src={previewImage.url}
                                alt=''
                            />
                        </div>
                    ))}
                </div>
            )}
        </>
    );
});

PreviewImages.propTypes = {
    previewImages: PropTypes.array,
    removeFile: PropTypes.func,
};

export default PreviewImages;
