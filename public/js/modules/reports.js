
import {createSimpleDataTable} from './functions/createDataTable';

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
                if (btnAction === 'downloadLoanDetailsReport') console.log('click on download', loanId);
            }
        });
    }

});