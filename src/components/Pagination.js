import React from 'react';
import { Link } from 'react-router-dom';

export const Pagination = ({ pager }) => {
    const { length, currentPage } = pager;
 
    return (
        <>
            { pager && length > 0 &&
                <ul className="pagination">
                    <li className={`page-item first-item ${currentPage === 1 ? 'disabled' : ''}`}>
                        <Link to={`/users/${currentPage}`} className="page-link">First</Link>
                    </li>
                    <li className={`page-item previous-item ${currentPage === 1 ? 'disabled' : ''}`}>
                        <Link to={`/users/${currentPage - 1}`} className="page-link">&lt;&lt;</Link>
                    </li>
                    <li key={currentPage} className={`page-item number-item`}>
                        <Link to={`/users/${currentPage}`} className="page-link">{currentPage}</Link>
                    </li>
                    <li className={`page-item next-item ${currentPage === length ? 'disabled' : ''}`}>
                        <Link to={`/users/${currentPage + 1}`} className="page-link">&gt;&gt;</Link>
                    </li>
                    <li className={`page-item last-item ${currentPage === length ? 'disabled' : ''}`}>
                        <Link to={`/users/${length}`} className="page-link">Last</Link>
                    </li>
                </ul>
            }
        </>
    );
};
