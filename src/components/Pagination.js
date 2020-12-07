import React from 'react';
import { Link } from 'react-router-dom';

export const Pagination = ({ pager, handler }) => {
    const { length, currentPage, limit } = pager;

    return (
        <>
            { pager && length > 0 &&
                <div>
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
                                {currentPage}
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
                    <div className="input-field">
                        <select value={limit} onChange={handler} className='select-limit'>
                            <option value="3">Show 3</option>
                            <option value="5">Show 5</option>
                            <option value="10">Show 10</option>
                        </select>
                    </div>
                </div>
            }
        </>
    );
};
