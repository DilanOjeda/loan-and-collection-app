import axios from 'axios';
import Swal  from 'sweetalert2';

import {createSimpleDataTable} from './functions/createDataTable';
// import {renderMsgModal} from '../functions/renderMsgModal';
// import {createDivAlerts} from '../functions/createDivAlerts';
// import {removeAllAlerts} from '../functions/removeAlerts';

document.addEventListener('DOMContentLoaded', function () {
    const tableIdCustomers = document.querySelector("#tableIdCustomers");
    if(tableIdCustomers){
        createSimpleDataTable(tableIdCustomers);
        tableIdCustomers.addEventListener('click', function(event) {
            if (event.target.getAttribute('customerId')) {
                const [btnAction, customerId] = event.target.getAttribute('customerid').split('_');
                switch (btnAction) {
                    case 'showCustomer':
                        showOneCustomer(customerId)
                        console.log('showCustomer --->', customerId);
                        break;
                    case 'updateCustomer':
                        console.log('updateCustomer --->', customerId);
                        break;
                    case 'deleteCustomer':
                        console.log('deleteCustomer --->', customerId);
                        break;
                }
            }
        });
    }

});


/**
 * Query to Get a user from the database and show in modal
 */
 const showOneCustomer = async (customerId) => {
    try {
        const url = `${location.origin}/customers/${customerId}`;
        const response = await axios.get(url);
        const {customer} = response.data; 
        if (customer) {
            document.getElementById('txtIdCustomerFullname').textContent = `${customer.names} ${customer.lastNames}`;
            document.getElementById('txtIdCustomerCi').textContent = customer.ci;
            document.getElementById('txtIdCustomerGnerder').textContent = customer.gender;
            document.getElementById('txtIdCustomerCellPhone').textContent = customer.cellPhone ? customer.cellPhone : '___________';
            document.getElementById('txtIdCustomerWithCredit').textContent = customer.withCredit ? 'Con Credito' : 'Sin Credito';
            document.getElementById('txtIdCustomerAddress').textContent = customer.address ? customer.address : '___________';
        }
    } catch (error) {
        console.log('ERROR => ', error);
        renderMsgModal('error', 'Error', `${error.response.status}: ${error.response.statusText}`);
    }    
}