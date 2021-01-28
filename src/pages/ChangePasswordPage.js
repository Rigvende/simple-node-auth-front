import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useMessage } from '../utils/message.hook';
import { useHttp } from '../utils/http.hook';
import { useHistory, useParams } from 'react-router-dom';
import { texts } from '../texts';
import CommonHelmet from '../components/Helmet';

export const ChangePasswordPage = () => {
    const message = useMessage();
    const history = useHistory();
    const id = useParams().id;
    const { token, login } = useContext(AuthContext);
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

    const changeHandler = event => setForm({ ...form, [event.target.name]: event.target.value });

    const confirmHandler = async () => {
        try {
            await request(`/change-pass/${id}`, 'POST', { ...form });
            if (!token) {
                const data = await request('/auth', 'POST', { ...form });
                login(data.token, data.id);
            } 
            history.push('/');
        } catch (err) { }
    };

    return (
        <div className='row'>
            <CommonHelmet title='Forgot password'/>
            
            <div className='col s6 offset-s3'>
                <h2>{texts.titles.reset}</h2>

                <div className="card blue darken-1">
                    <div className="card-content white-text">
                        <span className="card-title">{texts.titles.createCard}</span>

                        <div>
                            <div className="row">
                                <div className="input-field">
                                    <input id="password"
                                        type="text"
                                        name="password"
                                        value={form.password}
                                        className="yellow-input"
                                        onChange={changeHandler} />
                                    <label
                                        className="label-white"
                                        htmlFor="email">{texts.fields.newPassword}</label>
                                </div>

                                <div className="input-field">
                                    <input id="email"
                                        type="text"
                                        name="email"
                                        value={form.email}
                                        className="yellow-input"
                                        onChange={changeHandler} />
                                    <label
                                        className="label-white"
                                        htmlFor="email">{texts.fields.currentEmail}</label>
                                </div>
                            </div>
                        </div>                        
                    </div>

                    <div className="card-action">
                        <button
                            className='btn yellow darken-4 waves-effect waves-light'
                            disabled={loading}
                            onClick={confirmHandler}>
                            {texts.buttons.submit}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
