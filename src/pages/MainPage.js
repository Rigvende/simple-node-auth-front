import React, { useEffect, useState, useCallback } from 'react';
import { useHttp } from '../utils/http.hook';
import { useMessage } from '../utils/message.hook';
import { Loader } from '../components/Loader';
import { UsersList } from '../components/UsersList';

export const MainPage = () => {
    const message = useMessage();
    const { loading, error, clearError, request } = useHttp();
    const [users, setUsers] = useState(null);

    useEffect(() => {
        message(error);
        clearError();
    }, [error, message, clearError]);

    const getUsers = useCallback(async () => {
        try {
            const data = await request(`/users`, 'GET');
            setUsers(data.data.users);
        } catch (err) { }
    }, [request]);

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
        </div>
    )
};
