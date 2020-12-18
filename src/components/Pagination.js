import React from 'react';
import { Link } from 'react-router-dom';

export const Pagination = ({ pager, handler }) => {
    const { length, currentPage, limit } = pager;

    return (
        <>
            { pager && length > 0 &&
                <div className='row-with-buttons'>
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
                        <li key={currentPage} className={`page-item number-item`}>
                            <Link
                                to={`/users/${currentPage}`}
                                className="page-link">
                                Page {currentPage}
                            </Link>
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
                    
                    <div className={`page-item number-item`}>
                        <select value={limit} onChange={handler} className='select-limit'>
                            <option value="3">3 per page</option>
                            <option value="5">5 per page</option>
                            <option value="10">10 per page</option>
                        </select>
                    </div>
                </div>
            }
        </>
    );
};
