import PropTypes from 'prop-types';
import ProductPreviewThumbs from './ProductPreviewThumbs';
import ShownThumb from './ShownThumb';

function ProductThumbs({ thumbs }) {
    return (
        <div className='col-6 col-lg-12'>
            <div className='product-media'>
                <ProductPreviewThumbs thumbs={thumbs} />
                <ShownThumb thumbs={thumbs} />
            </div>
        </div>
    );
}

ProductThumbs.propTypes = {
    thumbs: PropTypes.array,
};

export default ProductThumbs;
