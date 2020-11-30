import { useCallback, useState, useContext } from 'react';
import { useAuth } from './auth.hook';
import { AuthContext } from '../context/AuthContext';
import { useHistory } from 'react-router-dom';
// import dotenv from 'dotenv';

export const useHttp = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { login } = useAuth();
    const auth = useContext(AuthContext);
    const history = useHistory();

    // dotenv.config();
    const { REACT_APP_SERVER_HOST } = process.env;

    const request = useCallback(
        async (url, method = 'GET', body = null, headers = {}) => {
            setLoading(true);
            try {
                if (body) {
                    body = JSON.stringify(body);
                    headers['Content-Type'] = 'application/json';
                    headers['Access-Control-Allow-Origin'] = REACT_APP_SERVER_HOST;
                    headers['Access-Control-Allow-Credentials'] = 'true';
                }
               
                const response = await fetch(`${REACT_APP_SERVER_HOST}` + url, { method, body, headers });
                const data = await response.json();

                if (!response.ok) {
                    if (data.message && response.status === 401) {
                        auth.logout();
                        history.push('/');
                    }
                    throw new Error(data.message || 'Something goes wrong...');
                }

                if (data.refresh) {
                    const { token, id } = data.refresh;
                    login(token, id);
                }
                setLoading(false);
                return data;
            } catch (err) {
                setLoading(false);
                setError(err.message);
                throw err;
            }
        }, [login, auth, history, REACT_APP_SERVER_HOST]);

    const clearError = useCallback(() => setError(null), []);

    return { loading, request, error, clearError };
};
