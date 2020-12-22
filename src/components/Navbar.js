import React, { useContext } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { texts } from '../texts';
import { useHttp } from '../utils/http.hook';

export const Navbar = () => {
    const history = useHistory();
    const { logout } = useContext(AuthContext);
    const { request } = useHttp();

    const logoutHandler = async (event) => {
        event.preventDefault();
        try {
            await request('/logout');
            logout();
            history.push('/');
        } catch (err) { }        
    };

    return (
        <nav>
            <div className="nav-wrapper blue darken-1">
                <a href="/" className="brand-logo">{texts.logo}</a>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li><NavLink to='/users'>{texts.links.users}</NavLink></li>
                    <li><NavLink to='/register'>{texts.links.add}</NavLink></li>
                    <li><a href="/logout" onClick={logoutHandler}>{texts.links.logout}</a></li>
                </ul>
            </div>
        </nav>
    )
};
