import React, { useEffect, useContext, useState } from 'react';
import { useHttp } from '../utils/http.hook';
import { useMessage } from '../utils/message.hook';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import SortedTableHeader, { getComparator, stableSort } from "./SortedTableHeader";

const columns = [
    { id: "name", label: "Name" },
    { id: "age", label: "Age" },
];

export const UsersList = ({ users }) => {
    const { request, error, clearError } = useHttp();
    const message = useMessage();
    const { idUser } = useContext(AuthContext);
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('name');

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    useEffect(() => {
        message(error);
        clearError();
    }, [error, message, clearError]);

    const deleteHandler = async (id) => {
        try {
            await request(`/users/${id}`, 'DELETE');
            const row = document.getElementById(id);
            row.parentNode.removeChild(row);
        } catch (err) { }
    };

    return (
        <table className="highlight centered">
            <SortedTableHeader
                columns={columns}
                order={order}
                orderBy={orderBy}
                operations={true}
                onRequestSort={handleRequestSort}
            />

            <tbody>
                {stableSort(users, getComparator(order, orderBy))
                    .map((user, index) => {
                        return (
                            <tr id={user.id} key={index}>
                                <td className={idUser === user.id ? `user` : null}>{user.name}</td>

                                <td>{user.age}</td>

                                <td>
                                    <Link
                                        className="button-link button-blue"
                                        to={`/edit/${user.id}`}>
                                        Edit
                                    </Link>

                                    <button
                                        className="button-link button-orange"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            deleteHandler(user.id);
                                        }}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        )
                    })}
            </tbody>
        </table>
    )
};
