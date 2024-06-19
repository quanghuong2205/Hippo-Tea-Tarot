import PropTypes from 'prop-types';
import { usePublishProduct } from '../../queries/useProduct';
import ProductInfor from './_components/ProductInfor';
import ProductThumbs from './_components/ProductThumbs';
import ProductDetailSkeleton from './ProductDetailSkeleton';
function MainProduct({ productID }) {
    /* Query product detail */
    const { data: PDData, isReady: PDIsReady } = usePublishProduct({
        id: productID,
    });

    return (
        <>
            {PDIsReady ? (
                <div className='product-detail__main'>
                    <div className='row'>
                        <ProductThumbs thumbs={PDData.thumbs} />
                        <ProductInfor product={PDData} />
                    </div>
                </div>
            ) : (
                <ProductDetailSkeleton />
            )}
        </>
    );
}

MainProduct.propTypes = {
    productID: PropTypes.string,
};

export default MainProduct;
