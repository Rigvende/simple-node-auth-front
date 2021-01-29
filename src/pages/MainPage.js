import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useHttp } from '../utils/http.hook';
import { useMessage } from '../utils/message.hook';
import { UsersList } from '../components/users/UsersList';
import { texts } from '../context/texts';
import { handlePrint, handleDownload } from '../utils/saveUtil';
import { Search } from '../components/shared/Search';
import CommonHelmet from '../components/shared/Helmet';

export const MainPage = () => {
    const componentRef = useRef();
    const message = useMessage();
    const { loading, error, clearError } = useHttp();
    const page = Number(useParams().page) || 1;
    const [searchedName, setSearchedName] = useState(null);
    const [changedName, setChangedName] = useState('');

    useEffect(() => {
        message(error);
        clearError();
    }, [error, message, clearError]);

    const searchChangeHandler = (event) => {
        setChangedName(event.target.value);
    }

    const clearHandler = () => {
        setChangedName('');
        setSearchedName(null);
    }

    const searchHandler = () => {
        setSearchedName(changedName);
    };

    const downloadHandler = () => {
        handleDownload(page, componentRef);
    };

    const printHandler = () => {
        handlePrint(page, componentRef);
    };

    return (
        <div >
            <CommonHelmet title='Users' />

            <div className='row' id='users-save' ref={componentRef} >
                <div className='col s6 offset-s3' >
                    <h2 className='row-with-buttons'>
                        {texts.titles.main}

                        <div className='m-left'>
                            <button
                                className='btn yellow darken-4 waves-effect waves-light'
                                disabled={loading}
                                onClick={downloadHandler}>
                                {texts.buttons.download}
                            </button>
                            <button
                                className='btn grey waves-effect waves-light'
                                disabled={loading}
                                onClick={printHandler}>
                                {texts.buttons.print}
                            </button>
                        </div>
                    </h2>

                    <Search
                        name={changedName}
                        searchHandler={searchHandler}
                        clearHandler={clearHandler}
                        changeHandler={searchChangeHandler} />

                    <UsersList page={page} searchedName={searchedName} />
                </div>
            </div>
        </div>
    )
};
