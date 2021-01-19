import React from 'react';
import { texts } from '../texts';

export const Search = (props) => {
    const { clearHandler, changeHandler, searchHandler, name } = props;

    const clearSearch = (
        <button
            className='btn grey waves-effect waves-light'
            onClick={clearHandler}>
            {texts.buttons.clear}
        </button>
    );
    
    return (
        <div>
            <input 
                name="name" 
                value={name}
                type="search" 
                placeholder="Search by name" 
                onChange={changeHandler} />

            <button
                className='btn yellow darken-4 waves-effect waves-light'
                onClick={searchHandler}>
                {texts.buttons.search}
            </button>

            {name ? clearSearch : null}
        </div>
    )
};
