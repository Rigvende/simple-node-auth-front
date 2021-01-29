import React, { useContext, useEffect, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useHttp } from '../utils/http.hook';
import { useMessage } from '../utils/message.hook';
import { AuthContext } from '../context/AuthContext';
import { texts } from '../texts';
import { Loader } from '../components/shared/Loader';
import CommonHelmet from '../components/shared/Helmet';

export const AuthPage = () => {
    const history = useHistory();
    const { login } = useContext(AuthContext);
    const message = useMessage();
    const { loading, error, clearError, request } = useHttp();
    const [form, setForm] = useState({
        email: '',
        password: '',
        rememberMe: false
    });

    useEffect(() => {
        message(error);
        clearError();
    }, [error, message, clearError]);

    useEffect(() => {
        window.M.updateTextFields();
    }, []);

    const changeHandler = event => {
        const { target } = event;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        setForm({ ...form, [target.name]: value });
    };

    const authHandler = async () => {
        try {
            const data = await request('/auth', 'POST', { ...form });
            login(data.token, data.id);
        } catch (err) { }
    };

    const registerHandler = () => history.push('/register');

    return (
        <div className='row'>
            <CommonHelmet title="Login"/>
            
            <div className='col s6 offset-s3'>
                <h2>{texts.titles.auth}<img src='/logo64.png' alt='logo' className="logo-margin" width='50px' height='50px' /></h2>

                <div className="card blue darken-1">
                    <div className="card-content white-text">
                        <span className="card-title">{texts.titles.authCard}</span>

                        <div>
                            <div className="row">
                                <div className="input-field">
                                    <input id="email"
                                        type="text"
                                        name="email"
                                        value={form.email}
                                        className="yellow-input"
                                        onChange={changeHandler} />
                                    <label
                                        className="label-white"
                                        htmlFor="email">{texts.fields.email}</label>
                                </div>
                            </div>

                            <div className="row">
                                <div className="input-field">
                                    <input
                                        id="password"
                                        type="password"
                                        name="password"
                                        value={form.password}
                                        className="yellow-input"
                                        onChange={changeHandler} />
                                    <label
                                        className="label-white"
                                        htmlFor="password">{texts.fields.password}</label>
                                </div>
                            </div>

                            <div className="row">
                                <div>
                                    <Link className="orange-link" to="/reset">
                                        {texts.links.forgot}
                                    </Link>
                                </div>

                                <div className="checkbox-margin">
                                    <label className="label-white">
                                        <input
                                            type="checkbox"
                                            className="filled-in"
                                            id='rememberMe'
                                            name='rememberMe'
                                            checked={form.rememberMe}
                                            onChange={changeHandler} />
                                        <span>{texts.tips.remember}</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="card-action">
                        <button
                            className='btn yellow darken-4 waves-effect waves-light'
                            disabled={loading}
                            onClick={authHandler}>
                            {texts.buttons.login}
                        </button>

                        <button
                            className='btn grey waves-effect waves-light'
                            disabled={loading}
                            onClick={registerHandler}>
                            {texts.buttons.register}
                        </button>
                    </div>
                </div>

                <Loader hidden={!loading}/>
            </div>
        </div>
    );
};
