import React, { useContext } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
// import { useHttp } from '../utils/http.hook';

export const Navbar = () => {
    const history = useHistory();
    const { logout } = useContext(AuthContext);
    // const { request } = useHttp();

    const logoutHandler = async (event) => {
        event.preventDefault();
        try {
            // await request('/logout');
            logout();
            history.push('/');
        } catch (err) { }        
    };

    return (
        <nav>
            <div className="nav-wrapper blue darken-1">
                <a href="/" className="brand-logo">Simple-Node-Auth</a>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li><NavLink to='/users'>Users</NavLink></li>
                    <li><NavLink to='/register'>Add user</NavLink></li>
                    <li><a href="/logout" onClick={logoutHandler}>Logout</a></li>
                </ul>
            </div>
        </nav>
    )
};
