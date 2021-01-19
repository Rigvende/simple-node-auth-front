import React from 'react';
import { Link } from 'react-router-dom';
import { texts } from '../texts';

export const Pagination = React.memo(({ pager, handler }) => {
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
                                {texts.links.first}
                            </Link>
                        </li>
                        <li className={`page-item previous-item ${currentPage === 1 ? 'disabled' : ''}`}>
                            <Link
                                to={currentPage <= 1 ? `/users/1` : `/users/${currentPage - 1}`}
                                className="page-link">
                                <i className="material-icons">{texts.icons.chevronLeft}</i>
                            </Link>
                        </li>
                        <li key={currentPage} className={`page-item number-item`}>
                            <Link
                                to={`/users/${currentPage}`}
                                className="page-link">
                                {texts.links.page} {currentPage}
                            </Link>
                        </li>
                        <li className={`page-item next-item} ${currentPage === length ? 'disabled' : ''}`}>
                            <Link
                                to={currentPage >= length ? `/users/${length}` : `/users/${currentPage + 1}`}
                                className="page-link">
                                <i className="material-icons">{texts.icons.chevronRight}</i>
                            </Link>
                        </li>
                        <li className={`page-item last-item ${currentPage === length ? 'disabled' : ''}`}>
                            <Link
                                to={`/users/${length}`}
                                className="page-link">
                                {texts.links.last}
                        </Link>
                        </li>
                    </ul>
                    
                    <div className={`page-item number-item`}>
                        <select value={limit} onChange={handler} className='select-limit'>
                            <option value="3">{texts.selects.page1}</option>
                            <option value="5">{texts.selects.page2}</option>
                            <option value="10">{texts.selects.page3}</option>
                        </select>
                    </div>
                </div>
            }
        </>
    );
});
