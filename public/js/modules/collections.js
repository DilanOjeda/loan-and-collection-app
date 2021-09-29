
import axios  from 'axios';
import {format} from 'date-fns';
import es from 'date-fns/locale/es';

import {createSimpleDataTable} from './functions/createDataTable';
import {createDynamicSelect} from './functions/createDynamicSelect';
import {renderMsgModal} from './functions/renderMsgModal';

const tbodyIdUnpaidFees = document.getElementById('tbodyIdUnpaidFees');
const listIdUnpaidFess = document.getElementById('listIdUnpaidFess');
const inputIdTotalFeesAmount = document.getElementById('inputIdTotalFeesAmount');

/**
 * Make a custom Client select  
 */
const selectIdLoans = document.getElementById('selectIdLoans');
if (selectIdLoans) {
   createDynamicSelect(selectIdLoans);
   selectIdLoans.addEventListener('change', function() {
      const loanId = document.getElementById('selectIdLoans').value;
      getLoanToCollect(loanId);
      inputIdTotalFeesAmount.value = 0;
   });
}
 
/**
 * Create data table with unpaid fees
 */
const tableIdUnpaidFees = document.getElementById('tableIdUnpaidFees');
// console.log('tableIdUnpaidFees', tableIdUnpaidFees)
if (tableIdUnpaidFees) {
   createSimpleDataTable(tableIdUnpaidFees, 'Cutoas Sin Pagar');
}

/**
 * Load unpaid fees 
 */
if (listIdUnpaidFess) {
   listIdUnpaidFess.addEventListener('click', function(event) {
      if (event.target.classList.contains('checkboxesFees')) {
         const checkboxesFees = document.querySelectorAll('.checkboxesFees');
         let totalFeesAmount = 0;
         checkboxesFees.forEach((checkboxfee, i) => {
            if (checkboxfee.checked) {
               const [feeId, feeAmount] = checkboxfee.value.split('_');
               totalFeesAmount += parseFloat(feeAmount);
               // console.log('checkboxfee CHECKED', i, feeId, feeAmount)
            }
         });
         console.log('totalFeesAmount', totalFeesAmount)
         inputIdTotalFeesAmount.value = totalFeesAmount;
      }
   })
}

/**
 * Button to collect fees   
 */
const btnIdCollectFees = document.getElementById('btnIdCollectFees');
if (btnIdCollectFees) {
   btnIdCollectFees.addEventListener('click', function() {
      console.log('click on btn')
   });
}

/**
 * Load Loan data in the inputs and load fees data in the table    
 */

async function getLoanToCollect (loanId) {
   try {
      listIdUnpaidFess.innerHTML = '';
      const url = `${location.origin}/loans/${loanId}`;
      const response = await axios.get(url);
      const {customer, fees, ...loan } = response.data.loan;
      if (loan) {
         document.getElementById('txtIdCustomerFullName').textContent = `${customer.names} ${customer.lastNames}`;
         document.getElementById('txtIdCreditAmount').textContent = `Monto Prestado: ${loan.creditAmount}`;
         document.getElementById('txtIdNumberFees').textContent = `Nro. Cuotas: ${loan.numberFees}`;
         document.getElementById('txtIdLoanDate').textContent = `Fecha del Prestamo: ` + format(new Date( loan.loanDate.replace('-', '/') ), 'EEE, dd-MMM-yyyy', {locale: es});
         loadListUnpaidFees(fees);
      }
   } catch (error) {
      console.log('ERROR => ', error);
      renderMsgModal('error', 'Error', `${error.response.status}: ${error.response.statusText}`);
   }
}
const loadListUnpaidFees = (fees) => {
   const templateUnpaidFeeRow = document.getElementById('templateUnpaidFeeRow').content;
   const fragment = document.createDocumentFragment();
   fees.forEach((fee, i) => {
      if (!fee.feeStatus) {
         templateUnpaidFeeRow.querySelector('li input').value = `${fee.id}_${fee.feeAmount}`;
         templateUnpaidFeeRow.querySelector('li').className = '';
         templateUnpaidFeeRow.querySelector('li').classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-start', ((i % 2) == 0)? 'list-group-item' : 'list-group-item-light');
         templateUnpaidFeeRow.querySelector('.numberFee').textContent = `Nro. ${fee.numberFee}`;
         templateUnpaidFeeRow.querySelector('.creditAmount').textContent = `${fee.feeAmount} Bs.`;
         templateUnpaidFeeRow.querySelector('.feePaymentDate').textContent = format(new Date( fee.feePaymentDate.replace('-', '/') ), 'EEE, dd-MMM-yyyy', {locale: es});
         const cloneUnpaidFeeRow =  templateUnpaidFeeRow.cloneNode(true);
         fragment.appendChild(cloneUnpaidFeeRow);
      }
   });
   listIdUnpaidFess.appendChild(fragment);
}

// const loadUnpaidFeesTable = (fees) => {
//    const templateUnpaidFeeTableRow = document.getElementById('templateUnpaidFeeTableRow').content;
//    const fragment = document.createDocumentFragment();
   
//    fees.forEach((fee, i) => {
//       if (!fee.feeStatus) {
//          // templateUnpaidFeeTableRow.querySelector('tr').children[0].textContent = 'ok';
//          templateUnpaidFeeTableRow.querySelector('tr').children[1].textContent = fee.numberFee;
//          templateUnpaidFeeTableRow.querySelector('tr').children[2].textContent = fee.feeAmount;
//          templateUnpaidFeeTableRow.querySelector('tr').children[3].textContent = format(new Date( fee.feePaymentDate.replace('-', '/') ), 'EEE, dd-MMM-yyyy', {locale: es});
//          templateUnpaidFeeTableRow.querySelector('tr td span').className ='';
//          templateUnpaidFeeTableRow.querySelector('tr td span').classList.add('badge', `${fee.feeStatus? 'bg-success' : 'bg-danger'}`);
//          templateUnpaidFeeTableRow.querySelector('tr td span').textContent = fee.feeStatus? 'Cancelado' : 'Pendiente';
//          const cloneUnpaidFeeRow =  templateUnpaidFeeTableRow.cloneNode(true);
//          fragment.appendChild(cloneUnpaidFeeRow);
//       }
//    });
//    tbodyIdUnpaidFees.appendChild(fragment);
// }