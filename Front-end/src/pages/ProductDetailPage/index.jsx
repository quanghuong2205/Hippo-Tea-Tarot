import { useParams } from 'react-router-dom';
import OtherProducts from './OtherProducts';
import MainProduct from './MainProduct';
import ProductFeedbacks from './ProductFeedback';

function ProductDetailPage() {
    /* Get the infor of the product by params */
    const params = useParams();
    const productID = params.id;
    const productCat = params.cat;

    return (
        <div className='page product-detail'>
            <div className='container'>
                <div className='product-detail__inner'>
                    <MainProduct productID={productID} />

                    <OtherProducts
                        productCat={productCat}
                        productID={productID}
                    />

                    <ProductFeedbacks productID={productID} />
                </div>
            </div>
        </div>
    );
}

export default ProductDetailPage;
