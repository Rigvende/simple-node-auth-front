import React, { useEffect, useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';
import CommonHelmet from '../components/shared/Helmet';
import { useMessage } from '../utils/message.hook';
import { texts } from '../context/texts';
import { Loader } from '../components/shared/Loader';

export const CatsPage = () => {
    const [url, setUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const message = useMessage();
    const history = useHistory();

    const clearError = useCallback(() => setError(''), []);
    const cancelHandler = () => history.push('/');

    useEffect(() => {
        message(error);
        clearError();
    }, [clearError, error, message]);

    const fetchCat = async () => {
        try {
            setLoading(true);
            let cats = await (await fetch(texts.catUrl)).json();
            if (cats) {
                setUrl(cats[0].url)
            }
            setLoading(false);
        } catch (err) {
            setLoading(false);
            setError('Cat generator failed');
        }
    }

    return (
        <div className='row'>
            <CommonHelmet title='Random Cat' />

            <div className='col s6 offset-s3' >
                <h2>{texts.titles.randomCat}</h2>

                <div className="card blue darken-1">
                    <div className="card-content white-text">
                        <div className='center'>
                            <img
                                src={url || texts.defaultCat}
                                className="cat-img"
                                alt='cat'
                            />
                        </div>

                        <div className="card-action">
                            <button
                                className='btn yellow darken-4 waves-effect waves-light'
                                disabled={loading}
                                onClick={fetchCat}>
                                {texts.buttons.cat}
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

                <Loader hidden={!loading} />
            </div>
        </div>
    )
}
