import PropTypes from 'prop-types';
import { usePublishProduct } from '../../queries/useProduct';
import ProductInfor from './_components/ProductInfor';
import ProductThumbs from './_components/ProductThumbs';
function MainProduct({ productID }) {
    /* Query product detail */
    const {
        isLoading: PDIsLoading,
        data: PDData,
        isSuccess: PDIsSuccess,
    } = usePublishProduct({ id: productID });

    return (
        <>
            {!PDIsLoading && PDIsSuccess && PDData && (
                <div className='product-detail__main'>
                    <div className='row'>
                        <ProductThumbs thumbs={PDData.thumbs} />
                        <ProductInfor product={PDData} />
                    </div>
                </div>
            )}
        </>
    );
}

MainProduct.propTypes = {
    productID: PropTypes.string,
};

export default MainProduct;
