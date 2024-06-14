import { useEffect, useRef } from 'react';

function usePagination({ refetchOnPageChange, pageInfor, setPageInfor }) {
    const isRefetch = useRef(false);

    const setPage = ({ page }) => {
        setPageInfor((prev) => {
            return {
                ...prev,
                page,
            };
        });
    };

    /* Refetch products when page changes */
    useEffect(() => {
        /* Not refetch for the first render */
        if (!isRefetch.current) {
            isRefetch.current = true;
            return;
        }
        refetchOnPageChange({
            cancelRefetch: false,
        });
    }, [pageInfor, refetchOnPageChange]);

    return {
        setPage,
        pageInfor,
    };
}

export default usePagination;
