import React, { useEffect, useState, useCallback } from 'react';
import { useHttp } from '../utils/http.hook';
import { useMessage } from '../utils/message.hook';
import { Loader } from '../components/Loader';
import { UsersList } from '../components/UsersList';
import { useParams } from 'react-router-dom';
import { Pagination } from '../components/Pagination';

export const MainPage = () => {
    const message = useMessage();
    const { loading, error, clearError, request } = useHttp();
    const [users, setUsers] = useState([]);
    const [pager, setPager] = useState({});
    const page = useParams().page || 1;

    useEffect(() => {
        message(error);
        clearError();
    }, [error, message, clearError]);

    const getUsers = useCallback(async () => {
        try {
            if (page !== pager.currentPage) {
                const data = await request(`/users?page=${page}`);
                setUsers(data.data.users);
                setPager(data.data.pager);
            }
        } catch (err) { }
    }, [request, page, pager.currentPage]);

    useEffect(() => {
        getUsers();
    }, [getUsers]);

    if (loading) {
        return <Loader />;
    }

    return (
        <div className='row'>
            <div className='col s6 offset-s3'>
                <h2>Users</h2>
                {users ? !loading && <UsersList users={users} handler={getUsers} /> : null}
            </div>
            <div className="card-footer pb-0 pt-3">
                <Pagination pager={pager} />
            </div>
        </div>
    )
};
