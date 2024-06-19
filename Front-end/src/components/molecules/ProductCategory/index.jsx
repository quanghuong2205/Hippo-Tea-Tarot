import PropTypes from 'prop-types';
import Product from '../Product';
import ProductSkeleton from '../Product/ProductSkeleton';

function ProductCategory({
    title,
    description,
    products,
    randomArray = [],
    productNumPerLine,
    isReady,
    HeaderRight,
}) {
    const numPerline = {
        1: 'col-12',
        2: 'col-6',
        3: 'col-4 gy-3  col-md-6',
        4: 'col-3 gy-3 col-xxl-4 col-md-6',
        5: 'col-2-4 col-xxl-3 col-lg-4 col-md-6 g-3 g-md-1',
        6: 'col-2 gy-3 col-xl-3  col-lg-4 col-md-6',
    };

    return (
        <div className='category'>
            <div className='category-header'>
                <div className='category-header__left'>
                    <div className='category-title'>
                        <h2>{title}</h2>
                        <span className='label'>New</span>
                    </div>
                    <p className='category-desc'>
                        {description
                            ? description
                            : 'Không có thêm thông tin mô tả về sản phẩm'}
                    </p>
                </div>

                {HeaderRight && (
                    <div className='category-header__right'>
                        <HeaderRight />
                    </div>
                )}
            </div>

            <div className='category-menu row g-3'>
                {isReady &&
                    products.map((p) => (
                        <Product
                            key={p._id}
                            product={p}
                            className={numPerline[productNumPerLine]}
                        />
                    ))}
                {!isReady &&
                    randomArray.map((id) => (
                        <ProductSkeleton
                            key={id}
                            className={numPerline[productNumPerLine]}
                        />
                    ))}
            </div>
        </div>
    );
}

ProductCategory.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    products: PropTypes.array,
    randomArray: PropTypes.array,
    productNumPerLine: PropTypes.number,
    HeaderRight: PropTypes.func,
    isReady: PropTypes.bool,
};

export default ProductCategory;
