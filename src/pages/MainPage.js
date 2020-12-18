import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useHttp } from '../utils/http.hook';
import { useMessage } from '../utils/message.hook';
import { Loader } from '../components/Loader';
import { UsersList } from '../components/UsersList';
import { Pagination } from '../components/Pagination';
import { useParams } from 'react-router-dom';
// import {htmlToText} from 'html-to-text';
import dateformat from 'dateformat';
import printJS from 'print-js';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

export const MainPage = () => {
    const componentRef = useRef();
    const message = useMessage();
    const { loading, error, clearError, request } = useHttp();
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(null);
    const [pager, setPager] = useState({});
    const page = Number(useParams().page) || 1;
    const [limit, setLimit] = useState(5);
    const [currentLimit, setCurrentLimit] = useState(null);

    useEffect(() => {
        message(error);
        clearError();
    }, [error, message, clearError]);

    const getUsers = useCallback(async () => {
        try {
            if (page !== currentPage || limit !== currentLimit) {
                const data = await request(`/users?page=${page}&limit=${limit}`);
                setUsers(data.data.users);
                setCurrentPage(page);
                setCurrentLimit(limit);
                setPager({
                    currentPage: page,
                    length: Math.ceil(data.data.length / data.data.limit),
                    limit
                });
            }
        } catch (err) { }
    }, [request, currentPage, page, currentLimit, limit]);

    useEffect(() => {
        getUsers();
    }, [getUsers]);

    if (loading) {
        return <Loader />;
    }

    const selectHandler = (event) => {
        event.preventDefault();
        if (event.target.value !== limit) {
            setLimit(event.target.value);
            getUsers();
        }
    }

    const handlePrint = () => {
        printJS('users-save', 'html');
    }

    const handleDownload = () => {
        html2canvas(document.querySelector("#users-save")).then(canvas => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF();
            pdf.addImage(imgData, 'PNG', 0, 0);
            const date = dateformat(new Date(), 'yyyymmdd');
            const fileName = `Users-${date}.txt`;
            pdf.save(fileName);
        });
    };

    return (
        <div id='users-save' ref={componentRef} >
            <div className='row'>
                <div className='col s6 offset-s3' >
                    <h2>Users</h2>
                    {users ? !loading && <UsersList users={users} /> : null}
                </div>
            </div>

            <div className="row">
                <div className='col s6 offset-s3'>
                    <Pagination pager={pager} handler={selectHandler} />
                </div>
            </div>

            <div className="card-action center">
                <button
                    className='btn yellow darken-4'
                    disabled={loading}
                    onClick={handlePrint}>
                    Print
                </button>
                <button
                    className='btn grey'
                    disabled={loading}
                    onClick={handleDownload}>
                    Download
                </button>
            </div>
        </div>
    )
};
