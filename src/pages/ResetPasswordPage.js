import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useMessage } from '../utils/message.hook';
import { useHttp } from '../utils/http.hook';
import { texts } from '../context/texts';
import CommonHelmet from '../components/shared/Helmet';

export const ResetPasswordPage = () => {
    const message = useMessage();
    const history = useHistory();
    const { loading, error, clearError, request } = useHttp();
    const [form, setForm] = useState({ email: '' });

    useEffect(() => {
        message(error);
        clearError();
    }, [error, message, clearError]);

    useEffect(() => {
        window.M.updateTextFields();
    }, []);

    const changeHandler = event => setForm({ ...form, [event.target.name]: event.target.value });

    const resetHandler = async () => {
        try {
            await request('/reset-pass', 'POST', { ...form });
            history.push('/');
        } catch (err) { }
    };

    const cancelHandler = () => history.push('/');

    return (
        <div className='row'>
            <CommonHelmet title='Reset password'/>
            
            <div className='col s6 offset-s3'>
                <h2>{texts.titles.reset}</h2>

                <div className="card blue darken-1">
                    <div className="card-content white-text">
                        <span className="card-title">{texts.titles.resetCard}</span>

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
                        </div>

                        <div className="notification-white">
                            <i className="material-icons">{texts.icons.infoOutline}</i>
                            <div className='logo-margin'>{texts.tips.checkmail}</div>
                        </div>
                    </div>

                    <div className="card-action">
                        <button
                            className='btn yellow darken-4 waves-effect waves-light'
                            disabled={loading}
                            onClick={resetHandler}>
                            {texts.buttons.submit}
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
    );
};
