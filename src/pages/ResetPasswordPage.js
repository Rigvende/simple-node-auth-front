import { useState, useEffect } from 'react';
import { useMessage } from '../utils/message.hook';
import { useHttp } from '../utils/http.hook';
import { useHistory } from 'react-router-dom';

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
            await request('/reset', 'POST', { ...form });
            history.push('/');
        } catch (err) { }
    };

    const cancelHandler = () => history.push('/');

    return (
        <div className='row'>
            <div className='col s6 offset-s3'>
                <h2>Reset password</h2>

                <div className="card blue darken-1">
                    <div className="card-content white-text">
                        <span className="card-title">Enter registration email:</span>

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
                                        htmlFor="email">Email</label>
                                </div>
                            </div>
                        </div>

                        <div className="notification-white">
                            After operation check your email in order to reset password
                        </div>
                    </div>

                    <div className="card-action">
                        <button
                            className='btn yellow darken-4 waves-effect waves-light'
                            disabled={loading}
                            onClick={resetHandler}>
                            Submit
                        </button>

                        <button
                            className='btn grey waves-effect waves-light'
                            disabled={loading}
                            onClick={cancelHandler}>
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
