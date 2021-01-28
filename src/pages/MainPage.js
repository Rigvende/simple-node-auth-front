import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useHttp } from '../utils/http.hook';
import { useMessage } from '../utils/message.hook';
import { Loader } from '../components/Loader';
import { UsersList } from '../components/UsersList';
import { Pagination } from '../components/Pagination';
import { useParams } from 'react-router-dom';
import { texts } from '../texts';
import { handlePrint, handleDownload } from '../utils/saveUtil';
import { Search } from '../components/Search';
import CommonHelmet from '../components/Helmet';

export const MainPage = () => {
    const componentRef = useRef();
    const message = useMessage();
    const { loading, error, clearError, request } = useHttp();
    const [users, setUsers] = useState([]);
    const [pager, setPager] = useState({});
    const page = Number(useParams().page) || 1;
    const [limit, setLimit] = useState(5);
    const [searchedName, setSearchedName] = useState(null);
    const [changedName, setChangedName] = useState('');   

    useEffect(() => {
        message(error);
        clearError();
    }, [error, message, clearError]);   

    const getUsers = useCallback(
        async () => {
            try {
                let url = `/users?page=${page}&limit=${limit}`;
                if (searchedName) {
                    url += `&name=${searchedName}`;
                }    
    
                const data = await request(url);
                setUsers(data.data.users);
                
                setPager({
                    currentPage: page,
                    length: Math.ceil(data.data.length / data.data.limit),
                    limit
                });            
            } catch (err) { }
        }, [page, limit, searchedName, request]);

    useEffect(() => {
        getUsers();
    }, [getUsers]);

    if (loading) {
        return <Loader />;
    }

    const selectHandler = (event) => {
        if (event.target.value !== limit) {
            setLimit(event.target.value);
        }
    };   

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
            <CommonHelmet />
            
            <div className='row' id='users-save' ref={componentRef} >
                <div className='col s6 offset-s3' >
                    <h2 className='row-with-buttons'>
                        {texts.titles.main}

                        <div>
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

                    {users ? !loading && <UsersList users={users} /> : null}
                </div>
            </div>

            <div className="row">
                <div className='col s6 offset-s3'>
                    <Pagination pager={pager} handler={selectHandler} />
                </div>
            </div>
        </div>
    )
};
