import React from 'react';
import { Link } from 'react-router-dom';

export const Pagination = ({ pager }) => {
    const { length, currentPage } = pager;

    return (
        <>
            { pager && length > 0 &&
                <ul className="pagination">
                    <li className={`page-item first-item ${currentPage === 1 ? 'disabled' : ''}`}>
                        <Link
                            to={`/users/1`}
                            className="page-link">
                            First
                            </Link>
                    </li>
                    <li className={`page-item previous-item ${currentPage === 1 ? 'disabled' : ''}`}>
                        <Link
                            to={currentPage <= 1 ? `/users/1` : `/users/${currentPage - 1}`}
                            className="page-link">
                            <i className="material-icons">chevron_left</i>
                        </Link>
                    </li>
                    <li key={currentPage} className={`page-item number-item user`}>
                        {currentPage}
                    </li>
                    <li className={`page-item next-item} ${currentPage === length ? 'disabled' : ''}`}>
                        <Link
                            to={currentPage >= length ? `/users/${length}` : `/users/${currentPage + 1}`}
                            className="page-link">
                            <i className="material-icons">chevron_right</i>
                        </Link>
                    </li>
                    <li className={`page-item last-item ${currentPage === length ? 'disabled' : ''}`}>
                        <Link
                            to={`/users/${length}`}
                            className="page-link">
                            Last
                        </Link>
                    </li>
                </ul>
            }
        </>
    );
};
