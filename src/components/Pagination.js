import React from 'react';
import { Link } from 'react-router-dom';

export const Pagination = ({ currentPage, length }) => {
    return (
        <>
            { length > 0 &&
                <ul className="pagination">
                    <li className={`page-item first-item ${currentPage === 1 ? 'disabled' : ''}`}>
                        <Link to={{ search: `?page=1` }} className="page-link">First</Link>
                    </li>
                    <li className={`page-item previous-item ${currentPage === 1 ? 'disabled' : ''}`}>
                        <Link to={{ search: `?page=${currentPage - 1}` }} className="page-link">Prev</Link>
                    </li>
                    <li key={currentPage} className={`page-item number-item`}>
                        <Link to={{ search: `?page=${currentPage}` }} className="page-link">{currentPage}</Link>
                    </li>
                    )
                    <li className={`page-item next-item ${currentPage === length ? 'disabled' : ''}`}>
                        <Link to={{ search: `?page=${currentPage + 1}` }} className="page-link">Next</Link>
                    </li>
                    <li className={`page-item last-item ${currentPage === length ? 'disabled' : ''}`}>
                        <Link to={{ search: `?page=${length}` }} className="page-link">Last</Link>
                    </li>
                </ul>
            }
        </>
    );
};
