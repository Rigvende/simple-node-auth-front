import React, { useCallback, useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useHttp } from '../utils/http.hook';
import { useMessage } from '../utils/message.hook';
import { texts } from '../context/texts';
import CommonHelmet from '../components/shared/Helmet';

export const EditPage = () => {
    const id = useParams().id;
    const history = useHistory();
    const message = useMessage();
    const { loading, error, clearError, request } = useHttp();
    const [form, setForm] = useState({
        name: '',
        age: '',
    });

    const getUser = useCallback(async () => {
        if (id) {
            try {
                const data = await request(`/users/${id}`);
                const { user } = data.data;

                if (user) {
                    const { name, age } = user;
                    setForm({ name, age });
                } else {
                    history.push('/users');
                }
            } catch (err) { }
        } else {
            history.push('/users');
        }
    }, [id, request, history]);

    useEffect(() => {
        getUser();
    }, [getUser]);

    useEffect(() => {
        message(error);
        clearError();
    }, [error, message, clearError]);

    useEffect(() => {
        window.M.updateTextFields();
    }, []);

    const changeHandler = event => setForm({ ...form, [event.target.name]: event.target.value });

    const updateHandler = async () => {
        try {
            await request(`/users/${id}`, 'PATCH', { ...form });
            history.push('/users');
        } catch (err) { }
    };

    const cancelHandler = () => history.push('/users');

    return (
        <div className='row'>
            <CommonHelmet title='Edit'/>
            
            <div className='col s6 offset-s3'>
                <h2>{texts.titles.edit}</h2>
                <div className="card blue darken-1">
                    <div className="card-content white-text">
                        <span className="card-title">{texts.titles.editCard}</span><br />
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
                        </div>
                    </div>
                    <div className="card-action">
                        <button
                            className='btn yellow darken-4 waves-effect waves-light'
                            disabled={loading}
                            onClick={updateHandler}>
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
