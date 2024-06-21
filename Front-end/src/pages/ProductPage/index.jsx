import useSearchParams from '../../hooks/useSearchParams';
import { usePublishProducts } from '../../queries/useProduct';
import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

import ProductCategory from '../../components/molecules/ProductCategory';
import Pagination from '../../components/molecules/Pagination';

import { createRandomArray } from '../../utils';
import FilterButton from './_components/FilterButton';

function ProductPage() {
    /* Get query string */
    const location = useLocation();
    const category = new URLSearchParams(location.search).get('category');

    /* Filter Params */
    const isFilter = useRef(false);
    const { searchParamObjects, setPage } = useSearchParams({
        filters: category ? { category: [category] } : {},
    });

    /* Query published products */
    const {
        data: PPData,
        refetch: PPRefetch,
        isReady: PPIsReady,
    } = usePublishProducts({ searchParamObjects });

    /* Refetch products when filtering */
    useEffect(() => {
        /* Not refetch for the first render */
        if (!isFilter.current) {
            isFilter.current = true;
            return;
        }

        PPRefetch({
            cancelRefetch: false,
        });
    }, [searchParamObjects, PPRefetch]);

    return (
        <div className='menu page'>
            <div className='container'>
                <ProductCategory
                    title={'COFFEE'}
                    description={null}
                    products={PPData?.products}
                    randomArray={createRandomArray({ size: 8 })}
                    productNumPerLine={5}
                    isReady={PPIsReady}
                    HeaderRight={() => <FilterButton />}
                />
                {PPIsReady && PPData.products.length !== 0 && (
                    <Pagination
                        totalPages={parseInt(PPData.totalPages)}
                        currentPage={parseInt(PPData.currentPage)}
                        prevPage={parseInt(PPData.prevPage)}
                        nextPage={parseInt(PPData.nextPage)}
                        setPage={setPage}
                    />
                )}
            </div>
        </div>
    );
}

export default ProductPage;
