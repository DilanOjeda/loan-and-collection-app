import flatpickr from 'flatpickr';
import Choices from 'choices.js';
import { Spanish } from 'flatpickr/dist/l10n/es';

const inputDatesFees = document.getElementById('inputDatesFees');
if (inputDatesFees) {
    flatpickr("#inputDatesFees", {
        locale: Spanish,
        mode: "multiple",
        dateFormat: "Y-m-d",
        inline: true,
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