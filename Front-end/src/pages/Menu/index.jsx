import useSearchParams from '../../hooks/useSearchParams';
import { usePublishProducts } from '../../queries/useProduct';
import Loading from '../../components/common/Loading';
import { useEffect, useRef } from 'react';
import Category from '../../components/molecules/Category';
import { CiFilter } from 'react-icons/ci';
import Pagination from '../../components/molecules/Pagination';
import { dispatchEvent } from '../../utils';
import EVENTS from '../../constants/event.constant';
import { PANEL_TITLES } from '../../constants/panel.constant';
import { useLocation } from 'react-router-dom';

function Menu() {
    /* Get query string */
    const location = useLocation();
    const category = new URLSearchParams(location.search).get('category');

    /* Filter */
    const isFilter = useRef(false);
    const { searchParamObjects, setPage } = useSearchParams({
        filters: category ? { category: [category] } : {},
    });

    /* Query published products */
    const {
        data: PPData,
        isSuccess: PPIsSuccess,
        refetch: PPRefetch,
        isFetching: PPIsFetching,
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
                {PPIsFetching && <Loading loadingText='Đang tải...' />}
                {!PPIsFetching && PPIsSuccess && PPData && (
                    <>
                        <Category
                            title={'COFFEE'}
                            description={null}
                            products={PPData.products}
                            productNumPerLine={5}
                            HeaderRight={() => (
                                <button
                                    className='pri-btn'
                                    style={{
                                        height: 38,
                                        fontWeight: 400,
                                    }}
                                    onClick={() => {
                                        dispatchEvent({
                                            eventName: EVENTS.OPEN_PANEL,
                                            payload: {
                                                title: PANEL_TITLES.FILTER_PANEL,
                                            },
                                        });
                                    }}>
                                    <CiFilter />
                                    Filter
                                </button>
                            )}
                        />
                        <Pagination
                            totalPages={parseInt(PPData.totalPages)}
                            currentPage={parseInt(PPData.currentPage)}
                            prevPage={parseInt(PPData.prevPage)}
                            nextPage={parseInt(PPData.nextPage)}
                            setPage={setPage}
                        />
                    </>
                )}
            </div>
        </div>
    );
}

export default Menu;
