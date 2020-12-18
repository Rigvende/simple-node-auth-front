import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useHttp } from '../utils/http.hook';
import { useMessage } from '../utils/message.hook';
import { Loader } from '../components/Loader';
import { UsersList } from '../components/UsersList';
import { Pagination } from '../components/Pagination';
import { useParams } from 'react-router-dom';
import dateformat from 'dateformat';
import { jsPDF } from 'jspdf';
import { RingierLight } from '../context/customFonts';

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
        const pdf = new jsPDF();
        buildPDF(pdf);
        pdf.autoPrint();
        pdf.output('dataurlnewwindow');
    }

    const handleDownload = () => {
        const pdf = new jsPDF();
        buildPDF(pdf);
        const date = dateformat(new Date(), 'yyyymmdd');
        const fileName = `Users-${date}.pdf`;
        pdf.save(fileName);
    };

    const buildPDF = (pdf) => {
        pdf.addFileToVFS('RingierLight.ttf', RingierLight);
        pdf.addFont('RingierLight.ttf', 'Ringier Light', 'normal', 'StandardEncoding');
        pdf.setFont('Ringier Light');
        pdf.setTextColor(50, 50, 50);
        const codeBlock = componentRef.current;
        let users = codeBlock.querySelectorAll('tr');

        let marginTop = 20;
        let marginLeft = 20;
        let index = 0;

        pdf.setFontSize(22)
        pdf.text(marginLeft, marginTop, `Users (page ${page})`);
        marginTop += 10;
        pdf.text(marginLeft, marginTop, '------------------------')

        users.forEach(user => {
            addUserDataToPDF(pdf, user, index, marginTop);
            marginTop += 10;
            index++;
        });
    };

    const addUserDataToPDF = (pdf, user, index, marginTop, marginLeft = 20) => {
        let data = user.querySelectorAll('td');
        if (data.length > 1) {
            let name = data[0].innerHTML;
            let age = data[1].innerHTML;
            pdf.setFontSize(16)
            pdf.text(marginLeft, marginTop, `${index}: ${name}, ${age} years`);
        }
    };

    return (
        <div >
            <div className='row' id='users-save' ref={componentRef} >
                <div className='col s6 offset-s3' >
                    <h2 className='row-with-buttons'>
                        Users

                        <div>
                            <button
                                className='btn yellow darken-4'
                                disabled={loading}
                                onClick={handleDownload}>
                                Download
                            </button>
                            <button
                                className='btn grey'
                                disabled={loading}
                                onClick={handlePrint}>
                                Print
                            </button>
                        </div>
                    </h2>

                    {users ? !loading && <UsersList users={users} /> : null}
                </div>
            </div>

            <div className="row">
                <div className='col s6 offset-s3'>
                    <Pagination pager={pager} handler={selectHandler} />
                </div>
            </div>
        </div>
    )
};
