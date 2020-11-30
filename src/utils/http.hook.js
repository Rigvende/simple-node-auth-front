import { useCallback, useState, useContext } from 'react';
import { useAuth } from './auth.hook';
import { AuthContext } from '../context/AuthContext';
import { useHistory } from 'react-router-dom';

export const useHttp = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { login } = useAuth();
    const auth = useContext(AuthContext);
    const history = useHistory();

    const { REACT_APP_SERVER_HOST } = process.env;

    const request = useCallback(
        async (url, method = 'GET', body = null, headers = {}) => {
            setLoading(true);
            try {
                const URL = REACT_APP_SERVER_HOST + url;
                const REQUEST = {
                    method, body: body ? JSON.stringify(body) : null,
                    headers: { 'Content-Type': 'application/json' }};

                const response = await fetch(URL, REQUEST);
                console.log(response);
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
                console.log(err);
                setLoading(false);
                setError(err.message);
                throw err;
            }
        }, [login, auth, history, REACT_APP_SERVER_HOST]);

    const clearError = useCallback(() => setError(null), []);

    return { loading, request, error, clearError };
};
