import React, { useEffect, useContext } from 'react';
import { useHttp } from '../utils/http.hook';
import { useMessage } from '../utils/message.hook';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export const UsersList = ({ users }) => {
    const { request, error, clearError } = useHttp();
    const message = useMessage();
    const { idUser } = useContext(AuthContext);

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
            <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Age</th>
                    <th>Operations</th>
                </tr>
            </thead>

            <tbody>
                {users.map((user, index) => {
                    return (
                        <tr id={user.id} key={index} style={idUser === user.id ? {background: 'green'} : null}>
                            <td>{index + 1}</td>
                            <td>{user.name}</td>
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
