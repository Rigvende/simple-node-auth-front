import React, { useEffect, useCallback, useState } from 'react';
import { useHttp } from '../../utils/http.hook';
import { useMessage } from '../../utils/message.hook';
import SortedTableHeader from "../shared/SortedTableHeader";
import { texts } from '../../context/texts';
import { Pagination } from '../shared/Pagination';
import { Loader } from '../shared/Loader';
import { UsersTableBody } from '../users/UsersTableBody';
import { UsersPerPage } from './UsersPerPage';

const columns = [
    { id: "name", label: "Name" },
    { id: "age", label: "Age" },
];

export const UsersList = ({ page, searchedName }) => {
    const { request, error, loading, clearError } = useHttp();
    const message = useMessage();
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('name');
    const [users, setUsers] = useState([]);
    const [limit, setLimit] = useState(5);
    const [pager, setPager] = useState({});

    useEffect(() => {
        message(error);
        clearError();
    }, [error, message, clearError]);

    const handleRequestSort = (event, property) => {
        event.preventDefault();
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

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

    const deleteHandler = async (id) => {
        try {
            await request(`/users/${id}`, 'DELETE');
            getUsers();
        } catch (err) { }
    };

    const selectHandler = (event) => {
        if (event.target.value !== limit) {
            setLimit(event.target.value);
        }
    };

    return (
        <div>
            { users ? !loading &&
                <div>
                    <table className="highlight centered">
                        <SortedTableHeader
                            columns={columns}
                            order={order}
                            orderBy={orderBy}
                            operations={true}
                            onRequestSort={handleRequestSort}
                        />

                        <UsersTableBody
                            users={users}
                            deleteHandler={deleteHandler}
                            order={order}
                            orderBy={orderBy} />
                    </table>

                    <div className="pagination">
                        <Pagination pager={pager} />
                    </div>

                    <div className="select-container">
                        <UsersPerPage limit={limit} selectHandler={selectHandler} />
                    </div>
                </div>
                : texts.tips.noUsers}
        </div>)
};
