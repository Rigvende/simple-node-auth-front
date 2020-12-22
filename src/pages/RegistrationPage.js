import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useHttp } from '../utils/http.hook';
import { useMessage } from '../utils/message.hook';
import { useHistory } from 'react-router-dom';
import { texts } from '../texts';

export const RegistrationPage = () => {
    const history = useHistory();
    const message = useMessage();
    const { token, login } = useContext(AuthContext);
    const { loading, error, clearError, request } = useHttp();
    const [form, setForm] = useState({
        name: '',
        age: '',
        email: '',
        password: ''
    });

    useEffect(() => {
        message(error);
        clearError();
    }, [error, message, clearError]);

    useEffect(() => {
        window.M.updateTextFields();
    }, []);

    const changeHandler = event => setForm({ ...form, [event.target.name]: event.target.value });

    const registerHandler = async () => {
        try {
            await request('/users', 'POST', { ...form });
            if (!token) {
                const data = await request('/auth', 'POST', { ...form });
                login(data.token, data.id);
            } 
            history.push('/');
        } catch (err) { }
    };

    const cancelHandler = () => history.push('/');

    return (
        <div className='row'>
            <div className='col s6 offset-s3'>
                <h2>{texts.titles.registration}</h2>
                <div className="card blue darken-1">
                    <div className="card-content white-text">
                        <span className="card-title">{texts.titles.registrationCard}</span><br />
                        <div>
                            <div className="input-field">
                                <label
                                    className="label-white"
                                    htmlFor="name">{texts.fields.name}</label>
                                <input
                                    placeholder={texts.placeholders.name}
                                    id="name"
                                    type="text"
                                    name="name"
                                    value={form.name}
                                    className="yellow-input"
                                    onChange={changeHandler} />
                            </div>
                            <div className="input-field">
                                <label
                                    className="label-white"
                                    htmlFor="age">{texts.fields.age}</label>
                                <input
                                    placeholder={texts.placeholders.age}
                                    id="age"
                                    type="text"
                                    name="age"
                                    value={form.age}
                                    className="yellow-input"
                                    onChange={changeHandler} />
                            </div>
                            <div className="input-field">
                                <label
                                    className="label-white"
                                    htmlFor="email">{texts.fields.email}</label>
                                <input
                                    placeholder={texts.placeholders.email}
                                    id="email"
                                    type="text"
                                    name="email"
                                    value={form.email}
                                    className="yellow-input"
                                    onChange={changeHandler} />
                            </div>
                            <div className="input-field">
                                <label
                                    className="label-white"
                                    htmlFor="password">{texts.fields.password}</label>
                                <input
                                    placeholder={texts.placeholders.password}
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={form.password}
                                    className="yellow-input"
                                    onChange={changeHandler} />
                            </div>
                        </div>
                    </div>
                    <div className="card-action">
                        <button
                            className='btn yellow darken-4 waves-effect waves-light'
                            disabled={loading}
                            onClick={registerHandler}>
                            {texts.buttons.save}
                        </button>
                        <button
                            className='btn grey waves-effect waves-light'
                            disabled={loading}
                            onClick={cancelHandler}>
                            {texts.buttons.cancel}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
};
