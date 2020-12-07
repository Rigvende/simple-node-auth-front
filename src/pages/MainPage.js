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
                    length: Math.ceil(data.data.length / data.data.limit)
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
    }

    return (
        <div>
            <div className='row'>
                <div className='col s6 offset-s3'>
                    <h2>Users</h2>
                    {users ? !loading && <UsersList users={users} /> : null}
                </div>
            </div>
            <div className='row'>
                <div className='col s6 offset-s3'>
                    <div>
                        <Pagination pager={pager} />
                        <div className='input-field'>
                            <select value={limit} onChange={selectHandler} className='select-limit'>
                                <option value="3">Show 3</option>
                                <option value="5">Show 5</option>
                                <option value="10">Show 10</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};
