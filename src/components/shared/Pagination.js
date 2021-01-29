import React from 'react';
import { Link } from 'react-router-dom';
import { texts } from '../../texts';

export const Pagination = React.memo(({ pager }) => {
    const { length, currentPage } = pager;

    return (
        <div>
            { pager && length > 0 &&
                <ul >
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
                    <li key={currentPage} className={`page-item number-item current-page`}>                        
                            {texts.links.page} {currentPage}
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
            }
        </div>
    );
});
