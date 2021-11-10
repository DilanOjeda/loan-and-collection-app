import axios from 'axios';

import {createSimpleDataTable} from './functions/createDataTable';
import {renderMsgModal} from './functions/renderMsgModal';


/**
 * Create a simple date table for Loans Details Reports
 */

document.addEventListener('DOMContentLoaded', function () {
    const tableIdLoanDetailsReport = document.querySelector("#tableIdLoanDetailsReport");
    if(tableIdLoanDetailsReport){
        createSimpleDataTable(tableIdLoanDetailsReport, 'Prestamos');
        tableIdLoanDetailsReport.addEventListener('click', function(event) {
            if (event.target.getAttribute('loanId')) {
                const [btnAction, loanId] = event.target.getAttribute('loanId').split('_');
                if (btnAction === 'downloadLoanDetailsReport') downloadLoanDetailsReport(loanId);
            }
        });
    }
});


/**
 * Rquest to download a loan details report pdf
 */
const downloadLoanDetailsReport = async (loanId) => {
    try {
        const url = `${location.origin}/reports/download-loan-details-report/${loanId}`;
        //    const response =  await axios.get(url);
        const response = await axios(url, {
            method: "GET",
            responseType: "blob"
            //Force to receive data in a Blob Format
        });
        // Create a Blob from the PDF Stream
        const file = new Blob([response.data], { type: "application/pdf" });
        //Build a URL from the file
        const fileURL = URL.createObjectURL(file);

        //Open the URL on new Window
        window.open(fileURL);
        
    } catch (error) {
        console.log('ERROR => ', error);
        renderMsgModal('error', 'Error', `${error.response.status}: ${error.response.statusText}`);
    }    
}

/**
 * Rquest to download a loan details report pdf
 */

const formIdLoanDateRangeReport = document.getElementById('formIdLoanDateRangeReport');
console.log('formIdLoanDateRangeReport', formIdLoanDateRangeReport);

formIdLoanDateRangeReport.addEventListener('submit', function(event) {
    event.preventDefault();
    const formDates = Object.fromEntries(new FormData(event.currentTarget)); 

});
