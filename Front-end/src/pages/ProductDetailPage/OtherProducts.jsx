import PropTypes from 'prop-types';
import { usePublishProductByCat } from '../../queries/useProduct';
import ScrollList from '../../components/common/ScrollList';
import Product from '../../components/molecules/Product';
import { createRandomArray } from '../../utils';
import ProductSkeleton from '../../components/molecules/Product/ProductSkeleton';

function OtherProducts({ productID, productCat }) {
    /* Query product by category */
    const { data: PBCData, isReady: PBCIsReady } = usePublishProductByCat({
        category: productCat,
        id: productID,
        searchParamObjects: {
            limit: 50,
            page: 1,
        },
    });

    return (
        <div className='product-detail__others'>
            {PBCIsReady ? (
                <ScrollList
                    title={'Có thể bạn quan tâm'}
                    link={`/menu?category=${PBCData?.products[0].category}`}
                    itemLen={PBCData?.products.length}
                    maxVisibleItems={6}
                    RenderComponent={() => {
                        return PBCData.products.map((p) => (
                            <Product
                                key={p._id}
                                product={p}
                                className={
                                    'col-2-4 col-xxl-3 col-lg-4 col-md-6'
                                }
                            />
                        ));
                    }}
                />
            ) : (
                <ScrollList
                    title={'Có thể bạn quan tâm'}
                    itemLen={4}
                    maxVisibleItems={4}
                    RenderComponent={() => {
                        return createRandomArray({ size: 4 }).map((id) => (
                            <ProductSkeleton
                                key={id}
                                className={
                                    'col-2-4 col-xxl-3 col-lg-4 col-md-6'
                                }
                            />
                        ));
                    }}
                />
            )}
        </div>
    );
}

OtherProducts.propTypes = {
    productCat: PropTypes.string,
    productID: PropTypes.string,
};

export default OtherProducts;
