import React, { useEffect, useState, useCallback } from 'react';
import { useHttp } from '../utils/http.hook';
import { useMessage } from '../utils/message.hook';
import { Loader } from '../components/Loader';
import { UsersList } from '../components/UsersList';
import { Pagination } from '../components/Pagination';
import { useParams } from 'react-router-dom';

export const MainPage = () => {
    const message = useMessage();
    const { loading, error, clearError, request } = useHttp();
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(null);
    const [pager, setPager] = useState({});
    const page = Number(useParams().page) || 1;

    useEffect(() => {
        message(error);
        clearError();
    }, [error, message, clearError]);

    const getUsers = useCallback(async () => {
        try {
            if (page !== currentPage) {
                const data = await request(`/users?page=${page}`);
                setUsers(data.data.users);
                setCurrentPage(page);
                setPager({
                    currentPage: page,
                    length: Math.ceil(data.data.length / data.data.limit)
                });
            }
        } catch (err) { }
    }, [request, currentPage, page]);

    useEffect(() => {
        getUsers();
    }, [getUsers]);

    if (loading) {
        return <Loader />;
    }

    return (
        <div>
            <div className='row'>
                <div className='col s6 offset-s3'>
                    <h2>Users</h2>
                    {users ? !loading && <UsersList users={users} /> : null}
                </div>
            </div>
            <div className="row">
                <div className='col s6 offset-s3'>
                    <Pagination pager={pager} />
                </div>
            </div>
        </div>
    )
};
