import Category from '../../../components/molecules/Category';
import { useBestSellers } from '../../../queries/usePublishProduct';
import { memo } from 'react';

const BestSeller = memo(function BestSeller() {
    /* Query best seller products */
    const {
        data: BSData,
        isLoading: BSIsLoading,
        isSuccess: BSIsSuccess,
    } = useBestSellers();

    return (
        <>
            {/* Best sellers */}
            {BSIsSuccess && (
                <Category
                    title='Bán chạy nhất'
                    products={BSData}
                    productNumPerLine={5}
                />
            )}
            {BSIsLoading && <h1>...is loading best sellers</h1>}
        </>
    );
});

export default BestSeller;
