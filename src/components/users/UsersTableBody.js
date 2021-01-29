import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { getComparator, stableSort } from "../shared/SortedTableHeader";
import { texts } from '../../texts';

export const UsersTableBody = ({ users, order, orderBy, deleteHandler }) => {
    const { idUser } = useContext(AuthContext);

    return (
        <tbody>
            {stableSort(users, getComparator(order, orderBy))
                .map((user, index) => {
                    return (
                        <tr id={user.id} key={index}>
                            <td className={idUser === user.id ? `user` : null}>{user.name}</td>

                            <td>{user.age}</td>

                            <td>
                                <Link
                                    className="button-link button-orange"
                                    to={`/edit/${user.id}`}>
                                    {texts.links.edit}
                                </Link>

                                <button
                                    className="button-link button-grey"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        deleteHandler(user.id);
                                    }}>
                                    {texts.buttons.delete}
                                </button>
                            </td>
                        </tr>
                    )
                })}
        </tbody>
    )
}