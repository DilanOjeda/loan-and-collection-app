import axios from 'axios';
import Swal  from 'sweetalert2';
import flatpickr from 'flatpickr';
import {Spanish} from 'flatpickr/dist/l10n/es';
import {format} from 'date-fns';
import es from 'date-fns/locale/es';

import {createSimpleDataTable} from './functions/createDataTable';
import {renderMsgModal} from './functions/renderMsgModal';
import {createDivAlerts} from './functions/createDivAlerts';
import {removeAllAlerts} from './functions/removeAlerts';
import {createDynamicSelect} from './functions/createDynamicSelect';


const tbodyIdLoanFees = document.getElementById('tbodyIdLoanFees');
/**
 * Create a simple date table for Loans
 */
 document.addEventListener('DOMContentLoaded', function () {
    const tableIdLoans = document.querySelector("#tableIdLoans");
    if(tableIdLoans){
        createSimpleDataTable(tableIdLoans, 'Clientes');
        tableIdLoans.addEventListener('click', function(event) {
            if (event.target.getAttribute('loanId')) {
                const [btnAction, loanId] = event.target.getAttribute('loanId').split('_');
                switch (btnAction) {
                    case 'showLoan':
                        showOneLoan(loanId);
                        break;
                }
            }
        });
    }

});
/**
 * Create a calendar for selecting fees dates
 */
const inputFeesDates = document.getElementById('inputFeesDates');
if (inputFeesDates) {
    const calendarDatesFees = flatpickr("#inputFeesDates", {
        locale: Spanish,
        mode: "multiple",
        dateFormat: "Y-m-d",
        // minDate: "today",
        inline: true,
        onChange: function(selectedDates, dateStr, instance){
            const inputNumberFees = document.getElementById('inputNumberFees');
            (selectedDates.length > 0) ? inputNumberFees.value = selectedDates.length : inputNumberFees.value = '';
            removeInputsValues();
        }
    });
}

/**
 * Make a custom Client select  
 */
const selectIdCustomers = document.getElementById('selectIdCustomers');
if (selectIdCustomers) {
    createDynamicSelect(selectIdCustomers);
}

/**
 * Function to calculate the total loan amount, interest amount and fees amount 
 */
const btnIdCalculate = document.getElementById('btnIdCalculate');
if (btnIdCalculate) {
    btnIdCalculate.addEventListener('click', function() {
        const inputCreditAmount = document.getElementById('inputCreditAmount').value;
        const inputInterestRate = document.getElementById('inputInterestRate').value;
        const inputNumberFees = document.getElementById('inputNumberFees').value;
        console.log('inputCreditAmount.length', inputCreditAmount.length)
        if ( !(inputCreditAmount > 0 && inputCreditAmount.length > 0) ) renderMsgModal('warning', false, `El monto del prestamo debe ser un número positivo.`);
        else if ( !( (inputInterestRate > 0 && inputInterestRate <= 100) && inputInterestRate.length > 0) ) renderMsgModal('warning', false, `El porcentaje de interés del prestamo debe ser de 1 a 100 %.`);
        else if ( !( (inputNumberFees > 0 && inputInterestRate <= 150) && inputCreditAmount.length > 0) ) renderMsgModal('warning', false, `La cantidad de cuotas a pagar debe ser de 1 a 150 días.`);
        else {
            const interestAmount = parseFloat(inputCreditAmount) * (parseFloat(inputInterestRate) / 100);
            const totalAmount = parseFloat(inputCreditAmount) + interestAmount;
            const feeAmount = totalAmount / parseFloat(inputNumberFees);

            document.getElementById('inputFeeAmount').value = feeAmount.toFixed(2);
            document.getElementById('inputInterestAmount').value = interestAmount.toFixed(2);
            document.getElementById('inputTotalAmount').value = totalAmount.toFixed(2);
        }
    });
}

/**
 * Query to create a new Loan 
 */
const formIdRegisterLoan = document.getElementById('formIdRegisterLoan');
if (formIdRegisterLoan) {
    formIdRegisterLoan.addEventListener('submit', async function(event) {
        event.preventDefault();
        const loanFormData = new FormData(event.currentTarget);
        const loanData = Object.fromEntries(loanFormData);
        if (loanData.customerId === '') return renderMsgModal('warning', false, `Seleccione un cliente registrado.`);
        Swal.fire({
            title: '¿Está seguro de realizar el prestamo?',
            text: "¡No podrás revertir esto!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, Realizar Prestamo',
            cancelButtonText: 'Cancelar'
        }).then(async (result) => {
            if (result.isConfirmed) {
                console.log('loanData : ', loanData);
                try {
                    const url = `${location.origin}/loans`;
                    const response = await axios.post(url, loanData);
                    console.log('response.data', response.data);
                    
                    const {errors} = response.data;
                    const cardAlerts = document.getElementById('cardAlerts');
                    if (errors) {
                        return createDivAlerts(errors, cardAlerts);
                    }
                    removeAllAlerts(cardAlerts);
                    formIdRegisterLoan.reset();
                    renderMsgModal('success', '¡Prestamo Registrado!', response.data.msg, false, 1000);
                    setInterval(() => { location.replace(`${location.origin}/loans`); }, 1000);
                } catch (error) {
                    console.log('ERROR => ', error);
                    renderMsgModal('error', 'Error', `${error.response.status}: ${error.response.statusText}`);
                }
            }
        }); 
    });
}
/**
 * Query to Get a Loan from the database to show in a modal
 */
 const showOneLoan = async (loanId) => {
     try {
        tbodyIdLoanFees.innerHTML = '';
        const url = `${location.origin}/loans/${loanId}`;
        const response = await axios.get(url);
        const {customer, fees, ...loan } = response.data.loan;
        if (loan) { 
            document.getElementById('txtCustomerFullName').innerHTML = `Cliente: ${customer.names} ${customer.lastNames}`;
            document.getElementById('txtIdLoanCreditAmount').textContent = `Monto prestado: ${loan.creditAmount} Bs.`;
            document.getElementById('txtIdLoanInterestRate').textContent = `Interés: ${loan.interestRate} %`;
            document.getElementById('txtIdLoanNumberFees').textContent = `Nro. de cuotas: ${loan.numberFees}`; 
            document.getElementById('txtIdLoanFeeAmount').textContent = `A pagar x cuota: ${loan.feeAmount} Bs.`;
            document.getElementById('txtIdLoanDate').textContent = `Fecha: ` + format(new Date (loan.loanDate.replace('-', '/')), 'EE, dd-MMM-yyyy', {locale: es});
            document.getElementById('txtIdLoanModality').textContent = `Modalidad: ${loan.modality}`;
            document.getElementById('txtIdLoanLoanStatus').innerHTML = `Estado: <span class="badge ${(loan.loanStatus ? 'bg-success' : 'bg-danger')}">${(loan.loanStatus ? 'Cancelado' : 'Pendiente')}</span>`;
            
            loadFeesTable(fees);
        }
    } catch (error) {
        console.log('ERROR => ', error);
        renderMsgModal('error', 'Error', `${error.response.status}: ${error.response.statusText}`);
    }    
}


const loadFeesTable = (fees) => {
    const templateTableFeeRow = document.getElementById('templateTableFeeRow').content;
    const fragment = document.createDocumentFragment();
    
    fees.forEach((fee, i) => {
        templateTableFeeRow.querySelector('tr').children[0].textContent = fee.numberFee;
        templateTableFeeRow.querySelector('tr').children[1].textContent = fee.feeAmount;
        templateTableFeeRow.querySelector('tr').children[2].textContent = format(new Date( fee.feePaymentDate.replace('-', '/') ), 'EEE, dd-MMM-yyyy', {locale: es});
        templateTableFeeRow.querySelector('tr td span').className ='';
        templateTableFeeRow.querySelector('tr td span').classList.add('badge', `${fee.feeStatus? 'bg-success' : 'bg-danger'}`);
        templateTableFeeRow.querySelector('tr td span').textContent = fee.feeStatus? 'Cancelado' : 'Pendiente';
        const cloneFeeRow =  templateTableFeeRow.cloneNode(true);
        fragment.appendChild(cloneFeeRow);
    });
    tbodyIdLoanFees.appendChild(fragment);
}

/**
 * Function to remove values from specific nputs fields 
 */

const inputModality = document.getElementById('inputModality');
const inputCreditAmount = document.getElementById('inputCreditAmount');
const inputInterestRate = document.getElementById('inputInterestRate');

if (inputCreditAmount || inputInterestRate) {
    [inputCreditAmount, inputInterestRate].forEach( input => {
        input.addEventListener('keydown', function() {
            removeInputsValues();
        });
    });
    [inputCreditAmount, inputInterestRate].forEach( input => {
        input.addEventListener('change', function() {
            removeInputsValues();
        });
    });
}

if (inputModality) {
    inputModality.addEventListener('change', removeInputsValues);
}
function removeInputsValues() {
    document.getElementById('inputFeeAmount').value = '';
    document.getElementById('inputInterestAmount').value = '';
    document.getElementById('inputTotalAmount').value = '';
}