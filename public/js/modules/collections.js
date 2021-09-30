
import axios  from 'axios';
import Swal  from 'sweetalert2';
import {format} from 'date-fns';
import es from 'date-fns/locale/es';

import {createSimpleDataTable} from './functions/createDataTable';
import {createDynamicSelect} from './functions/createDynamicSelect';
import {renderMsgModal} from './functions/renderMsgModal';

const listIdUnpaidFess = document.getElementById('listIdUnpaidFess');
const inputIdTotalFeesAmount = document.getElementById('inputIdTotalFeesAmount');

let feesChecked = [];
let totalPaidFees = 0;

/**
 * Make a custom Client select  
 */
const selectIdLoans = document.getElementById('selectIdLoans');
if (selectIdLoans) {
   createDynamicSelect(selectIdLoans);
   selectIdLoans.addEventListener('change', function() {
      if (selectIdLoans.value) getLoanToCollect(selectIdLoans.value);
      else {
         cleanTxtLoanInfo();
         listIdUnpaidFess.innerHTML = '';
      }
      inputIdTotalFeesAmount.value = 0;
      totalPaidFees = 0;
      feesChecked = [];
   });
}
 
/**
 * Create data table to unpaid fees
 */
const tableIdUnpaidFees = document.getElementById('tableIdUnpaidFees');
if (tableIdUnpaidFees) {
   createSimpleDataTable(tableIdUnpaidFees, 'Cuotas Sin Pagar');
}

/**
 * Create data table to paid fees
 */
 const tableIdPaidFees = document.getElementById('tableIdPaidFees');
 if (tableIdPaidFees) {
    createSimpleDataTable(tableIdPaidFees, 'Cuotas Pagadas');
 }
/**
 * Load unpaid fees 
 */
if (listIdUnpaidFess) {
   listIdUnpaidFess.addEventListener('click', function(event) {
      if (event.target.classList.contains('checkboxesFees')) {
         const checkboxesFees = document.querySelectorAll('.checkboxesFees');
         totalPaidFees = 0;
         feesChecked = [];
         checkboxesFees.forEach((checkboxfee, i) => {
            if (checkboxfee.checked) {
               const [feeId, feeAmount] = checkboxfee.value.split('_');
               totalPaidFees += parseFloat(feeAmount);
               feesChecked.push(feeId);
            }
         });
         inputIdTotalFeesAmount.value = totalPaidFees;
      }
   })
}

/**
 * Button to collect fees   
 */
const btnIdCollectFees = document.getElementById('btnIdCollectFees');
if (btnIdCollectFees) {
   btnIdCollectFees.addEventListener('click', async () => {

      if (!(feesChecked && totalPaidFees && selectIdLoans.value)) return renderMsgModal('warning', false, `Selecciona un prestamo y las cutoas que desea pagar.`);
      
      Swal.fire({
         title: '¿Está seguro de registrar el pago de las cuotas seleccionadas?',
         text: "¡No podrás revertir esto!",
         icon: 'warning',
         showCancelButton: true,
         confirmButtonColor: '#3085d6',
         cancelButtonColor: '#d33',
         confirmButtonText: 'Si, Registrar pago',
         cancelButtonText: 'Cancelar'
     }).then(async (result) => {
         if (result.isConfirmed) {
            const paidFeesData = {
               loanId: selectIdLoans.value,
               totalPaidFees,
               fees: feesChecked
            }
            try {
               const url = `${location.origin}/collections/collect-fees`;
               const response = await axios.post(url, paidFeesData);
               console.log('res=>', response.data);
               // const {paidFees} = response.data.paidFees;
               renderMsgModal('success', '¡Cuotas Pagadas!', response.data.msg, false, 3000);
               setInterval(() => { location.replace(`${location.origin}/collections`); }, 3000);
            } catch (error) {
               console.log('ERROR => ', error);
               renderMsgModal('error', 'Error', `${error.response.status}: ${error.response.statusText}`);
            }     
         }
     }); 
      
      
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


const cleanTxtLoanInfo = () => {
   document.getElementById('txtIdCustomerFullName').textContent = `Cliente`;
   document.getElementById('txtIdCreditAmount').textContent = `Monto Prestado: `;
   document.getElementById('txtIdNumberFees').textContent = `Nro. Cuotas: `;
   document.getElementById('txtIdLoanDate').textContent = `Fecha del Prestamo: `;
}