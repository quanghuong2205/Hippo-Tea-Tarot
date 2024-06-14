import PropTypes from 'prop-types';
import Image from '../../../components/atoms/Image';
import config from '../../../../configs';

function ProductPreviewThumbs({ thumbs }) {
    return (
        <div className='product-media__preview d-md-none'>
            {thumbs.map((thumb, index) => (
                <div
                    key={`preview/${thumb}/${index}`}
                    className=''>
                    <Image
                        src={`${config.SERVER_URL}/${thumb}`}
                        className={'product-media__preview-image'}
                    />
                </div>
            ))}
        </div>
    );
}

ProductPreviewThumbs.propTypes = {
    thumbs: PropTypes.array,
};

export default ProductPreviewThumbs;
