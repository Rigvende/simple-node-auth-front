import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useHttp } from '../utils/http.hook';
import { useMessage } from '../utils/message.hook';
import { Loader } from '../components/Loader';
import { UsersList } from '../components/UsersList';
import { Pagination } from '../components/Pagination';
import { useParams } from 'react-router-dom';
import { texts } from '../texts';
import { handlePrint, handleDownload } from '../utils/saveUtil';

export const MainPage = () => {
    const componentRef = useRef();
    const message = useMessage();
    const { loading, error, clearError, request } = useHttp();
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(null);
    const [pager, setPager] = useState({});
    const page = Number(useParams().page) || 1;
    const [limit, setLimit] = useState(5);
    const [currentLimit, setCurrentLimit] = useState(null);

    useEffect(() => {
        message(error);
        clearError();
    }, [error, message, clearError]);

    const getUsers = useCallback(async () => {
        try {
            if (page !== currentPage || limit !== currentLimit) {
                const data = await request(`/users?page=${page}&limit=${limit}`);
                setUsers(data.data.users);
                setCurrentPage(page);
                setCurrentLimit(limit);
                setPager({
                    currentPage: page,
                    length: Math.ceil(data.data.length / data.data.limit),
                    limit
                });
            }
        } catch (err) { }
    }, [request, currentPage, page, currentLimit, limit]);

    useEffect(() => {
        getUsers();
    }, [getUsers]);

    if (loading) {
        return <Loader />;
    }

    const selectHandler = (event) => {
        event.preventDefault();
        if (event.target.value !== limit) {
            setLimit(event.target.value);
            getUsers();
        }
    };   

    const downloadHandler = (event) => {
        event.preventDefault();
        handleDownload(page, componentRef);
    };

    const printHandler = (event) => {
        event.preventDefault();
        handlePrint(page, componentRef);
    };

    return (
        <div >
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
