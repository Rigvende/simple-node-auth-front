import React, { useEffect, useState, useCallback } from 'react';
import { useHttp } from '../utils/http.hook';
import { useMessage } from '../utils/message.hook';
import { Loader } from '../components/Loader';
import { UsersList } from '../components/UsersList';
import { Pagination } from '../components/Pagination';

export const MainPage = () => {
    const message = useMessage();
    const { loading, error, clearError, request } = useHttp();
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(null);

    useEffect(() => {
        message(error);
        clearError();
    }, [error, message, clearError]);

    const getPage = () => {
        let search = window.location.search;
        let params = new URLSearchParams(search);
        return params.get('page');
    }

    const getUsers = useCallback(async () => {
        try {
            const page = getPage();
            console.log(page);
            if (page !== currentPage) {
                const data = await request(`/users?page=${page}`);
                setUsers(data.data.users);
                setCurrentPage(page);
            }
        } catch (err) { }
    }, [request, currentPage]);

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
                {users ? !loading && <UsersList users={users} /> : null}
            </div>
            <div className="card-footer pb-0 pt-3">
                <Pagination />
            </div>
        </div>
    )
};
