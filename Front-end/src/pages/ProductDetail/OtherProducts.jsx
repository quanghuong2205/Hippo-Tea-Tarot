import PropTypes from 'prop-types';
import { usePublishProductByCat } from '../../queries/useProduct';
import ScrollList from '../../components/common/ScrollList';
import Product from '../../components/molecules/Product';

function OtherProducts({ productID, productCat }) {
    /* Query product by category */
    const {
        isFetching: PBCIsFetching,
        data: PBCData,
        isSuccess: PBCIsSuccess,
    } = usePublishProductByCat({
        category: productCat,
        id: productID,
        searchParamObjects: {
            limit: 50,
            page: 1,
        },
    });
    return (
        <div className='product-detail__others'>
            {!PBCIsFetching &&
                PBCIsSuccess &&
                PBCData?.products.length !== 0 && (
                    <ScrollList
                        title={'Có thể bạn quan tâm'}
                        link={`/menu?category=${PBCData?.products[0].category}`}
                        itemLen={PBCData?.products.length}
                        maxVisibleItems={6}
                        RenderComponent={() => {
                            return PBCData.products.map((p, index) => (
                                <Product
                                    key={`${p.id}/${index}`}
                                    product={p}
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
