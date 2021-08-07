import dateformat from 'dateformat';
import { jsPDF } from 'jspdf';
import moment from 'moment';
import { RingierLight } from '../context/customFonts';
import { texts } from '../context/texts';

//? txt print:
export const handlePrint = (page, ref) => {
    let userList = [];
    buildUsers(userList, ref);
    const text = getPrintableText(userList, page);
    const iframe = document.createElement('iframe');
    iframe.setAttribute('title', 'Users List');
    iframe.setAttribute('id', 'UsersList');
    iframe.setAttribute('style', 'height: 0px; width: 0px; position: absolute;');
    document.body.appendChild(iframe);
    const pri = iframe.contentWindow;
    pri.document.open();
    pri.document.write(`<pre style="font-size: 24px">${text}</pre>`);
    pri.document.close();
    pri.focus();
    pri.print();
};

//? txt download:
// export const handleDownload = (page, ref) => {
//     let userList = [];
//     buildUsers(userList, ref);
//     const text = getPrintableText(userList, page);
//     const fileName = `Users-SimpleNodeAuth-${moment().format('YYYYMMDD')}.txt`;
//     const element = document.createElement('a');
//     element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
//     element.setAttribute('download', fileName);
//     element.style.display = 'none';
//     document.body.appendChild(element);
//     element.click();
//     document.body.removeChild(element);
// };

//? pdf print:
// export const handlePrint = (page, ref) => {
//     const pdf = new jsPDF();
//     buildPDF(pdf, page, ref);
//     pdf.autoPrint();
//     pdf.output('dataurlnewwindow');
// }

//? pdf download:
export const handleDownload = (page, ref) => {
    const pdf = new jsPDF();
    buildPDF(pdf, page, ref);
    const date = dateformat(new Date(), 'yyyymmdd');
    const fileName = `Users-${date}.pdf`;
    pdf.save(fileName);
};

const getPrintableText = (userList, page) =>
    `${texts.titles.print} ${page}\n
        ${userList.join('\n')}\n
        Created at: ${moment().format('DD.MM.YYYY | HH:mm')}`;

const buildUsers = (userList, ref) => {
    const codeBlock = ref.current;
    let trs = codeBlock.querySelectorAll('tr');
    let index = 0;
    trs.forEach(tr => {
        let data = tr.querySelectorAll('td');
        if (data.length > 1) {
            let name = data[0].innerHTML;
            let age = data[1].innerHTML;
            userList.push(`${index}: ${name}, ${age} years`);
        }
        index++;
    });
};

const buildPDF = (pdf, page, ref) => {
    pdf.addFileToVFS('GowunDodum-Regular.ttf', GowunDodumRegular);
    pdf.addFont('GowunDodum-Regular.ttf', 'Gowun Dodum Regular', 'normal', 'StandardEncoding');
    pdf.setFont('Gowun Dodum Regular');
    pdf.setTextColor(50, 50, 50);
    const codeBlock = ref.current;
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
