import PropTypes from 'prop-types';
import { MdKeyboardDoubleArrowRight } from 'react-icons/md';
import { createArrayBasedOnLength } from '../../../utils';
import clsx from 'clsx';

function Pagination({
    currentPage,
    totalPages,
    setPage,
    prevPage,
    nextPage,
}) {
    const maxVisibleButtons = 12;

    if (totalPages === 1) {
        return <></>;
    }

    return (
        <div className='pagination'>
            <button
                onClick={() => setPage({ page: currentPage - 1 })}
                className={clsx({
                    'pagination__back-btn': true,
                    disable: !prevPage,
                })}>
                <MdKeyboardDoubleArrowRight />
            </button>

            <div className='pagination__pages'>
                {createArrayBasedOnLength({ length: totalPages }).map(
                    (page, index) =>
                        index < maxVisibleButtons && (
                            <button
                                onClick={() => setPage({ page })}
                                className={clsx({
                                    active: page === parseInt(currentPage),
                                })}
                                key={page}>
                                {page}
                            </button>
                        )
                )}
            </div>

            <button
                onClick={() => setPage({ page: currentPage + 1 })}
                className={clsx({
                    'pagination__next-btn': true,
                    disable: !nextPage,
                })}>
                <MdKeyboardDoubleArrowRight />
            </button>
        </div>
    );
}

Pagination.propTypes = {
    currentPage: PropTypes.number,
    prevPage: PropTypes.number,
    nextPage: PropTypes.number,
    setPage: PropTypes.func,
    totalPages: PropTypes.number,
};

export default Pagination;
