import axios from 'axios';
import flatpickr from 'flatpickr';
import Choices from 'choices.js';
import {Spanish} from 'flatpickr/dist/l10n/es';

import {renderMsgModal} from './functions/renderMsgModal';
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
            
            // console.log('selectedDates', selectedDates.length);ç
            console.log('dateStr', dateStr);
            // selectedDates.forEach(date => {
            //     console.log('dates', date.getUTCDate(), date.getMonth()+1);
            // })
        }
    });
}

const selectIdCustomers = document.getElementById('selectIdCustomers');
if (selectIdCustomers) {
    const choicesCustomers = new Choices(selectIdCustomers, {
        loadingText: 'Cargando...',
        noResultsText: 'No se han encontrado resultados',
        noChoicesText: 'No hay opciones para elegir',
        itemSelectText: 'Presione para seleccionar',
    });
}

const btnIdCalculate = document.getElementById('btnIdCalculate');
if (btnIdCalculate) {
    btnIdCalculate.addEventListener('click', function() {
        const inputCreditAmount = parseFloat(document.getElementById('inputCreditAmount').value);
        const inputInterestRate = parseFloat(document.getElementById('inputInterestRate').value);
        const inputNumberFees = document.getElementById('inputNumberFees').value;
        if (inputCreditAmount && inputInterestRate && inputNumberFees) {
            const interestAmount = inputCreditAmount * (inputInterestRate / 100);
            const totalAmount = parseFloat(inputCreditAmount) + parseFloat(interestAmount);
            const feeAmount = totalAmount / inputNumberFees;

            document.getElementById('inputFeeAmount').value = feeAmount.toFixed(2);
            document.getElementById('inputInterestAmount').value = interestAmount.toFixed(2);
            document.getElementById('inputTotalAmount').value = totalAmount.toFixed(2);
            console.log( feeAmount, interestAmount, totalAmount)
        }else {
            console.log('vacio')
        }
    });
}

const formIdRegisterLoan = document.getElementById('formIdRegisterLoan');
if (formIdRegisterLoan) {
    formIdRegisterLoan.addEventListener('submit', async function(event) {
        event.preventDefault();
        console.log('click');
        const loanFormData = new FormData(event.currentTarget);
        const loanData = Object.fromEntries(loanFormData);
        console.log('loanData : ', loanData);
        try {
            const url = `${location.origin}/loans`;
            const response = await axios.post(url, loanData);
            console.log('response.data', response.data);
            // const cardAlerts = document.getElementById('cardAlerts');
            // if (response.data.errors) {
            //     const errors = response.data.errors;
            //     return createDivAlerts(errors, cardAlerts);
        } catch (error) {
            console.log('ERROR => ', error);
            renderMsgModal('error', 'Error', `${error.response.status}: ${error.response.statusText}`)
        }
    })
}