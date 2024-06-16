import PropTypes from 'prop-types';
function ProductSkeleton({ className }) {
    return (
        <div className={className || 'col-3 gy-3 col-lg-4 col-md-6'}>
            <article className='product-card'>
                <div className='product-card__media skeleton'></div>

                <div className='product-card__infor'>
                    <p className='skeleton-text'></p>

                    <div className='product-card__footer'>
                        <p className='skeleton-text'></p>

                        <div className='product-card__rating skeleton-flex'>
                            <p className='skeleton-text w-70'></p>
                            <p className='skeleton-text'></p>
                        </div>

                        <div className='product-card__status skeleton-text'></div>
                    </div>
                </div>
            </article>
        </div>
    );
}

ProductSkeleton.propTypes = {
    className: PropTypes.string,
};

export default ProductSkeleton;
