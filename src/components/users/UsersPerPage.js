import React from 'react';
import { texts } from '../../texts'

export const UsersPerPage = ({ limit, selectHandler }) => {
    return (
        <div className={`page-item number-item`}>
            <select value={limit} onChange={selectHandler} className='select-limit'>
                <option value="3">{texts.selects.page1}</option>
                <option value="5">{texts.selects.page2}</option>
                <option value="10">{texts.selects.page3}</option>
            </select>
        </div>
    )
};
