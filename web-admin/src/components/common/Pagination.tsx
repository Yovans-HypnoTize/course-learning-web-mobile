import React from 'react';

interface PaginationProps {
    currentPage: number;
    totalPage: number;
    hasNext: boolean;
    hasPrevious: boolean;
    nextPage: () => void;
    previousPage: () => void;
    disableNext: boolean;
    disablePrevious: boolean;
    setPage: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
    currentPage,
    totalPage,
    nextPage,
    previousPage,
    disableNext,
    disablePrevious,
    setPage,
}) => {
    const renderPageNumbers = () => {
        const pages = [];

        for (let i = 1; i <= totalPage; i++) {
            pages.push(
                <li key={i} className={`page-item ${i === currentPage ? 'active' : ''}`}>
                    <button className="page-link" onClick={() => setPage(i)}>
                        {i}
                    </button>
                </li>
            );
        }
        return pages;
    };

    return (
        <nav aria-label="Page navigation example">
            <ul className="pagination justify-content-center">
                <li className={`page-item common-btn ${disablePrevious ? 'disabled' : ''}`}>
                    <button
                        className="page-link"
                        onClick={previousPage}
                        aria-label="Previous"
                        disabled={disablePrevious}
                    >
                        <span aria-hidden="true">&laquo;</span>
                    </button>
                </li>

                {renderPageNumbers()}

                <li className={`page-item ${disableNext ? 'disabled' : ''}`}>
                    <button
                        className="page-link "
                        onClick={nextPage}
                        aria-label="Next"
                        disabled={disableNext}
                    >
                        <span aria-hidden="true">&raquo;</span>
                    </button>
                </li>
            </ul>
        </nav>
    );
};

export default Pagination;
