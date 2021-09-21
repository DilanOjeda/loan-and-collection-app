import axios from 'axios';
import Swal  from 'sweetalert2';

import {createSimpleDataTable} from './functions/createDataTable';
import {renderMsgModal} from './functions/renderMsgModal';
import {createDivAlerts} from './functions/createDivAlerts';
import {removeAllAlerts} from './functions/removeAlerts';

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
                        break;
                    case 'updateCustomer':
                        showCustomerToUpdate(customerId);
                        break;
                    case 'deleteCustomer':
                        deleteOneCustomer(customerId);
                        break;
                }
            }
        });
    }

});

/**
 * Query to sign up a new Customer 
 */
 const formIdSignUpCustomer = document.getElementById('formIdSignUpCustomer');
 if (formIdSignUpCustomer) {
     formIdSignUpCustomer.addEventListener('submit', async function(event) {
         event.preventDefault();
         const customerFormData = new FormData(event.currentTarget);
         const customerData = Object.fromEntries(customerFormData);
         const btnIdCloseSignUpCustomer = document.getElementById('btnIdCloseSignUpCustomer');
         
         try {
             const url = `${location.origin}/customers`;
             const response = await axios.post(url, customerData);
             const cardAlerts = document.getElementById('cardAlerts');
             if (response.data.errors) {
                 const errors = response.data.errors;
                 return createDivAlerts(errors, cardAlerts);
             }
             removeAllAlerts(cardAlerts);
             formIdSignUpCustomer.reset();
             btnIdCloseSignUpCustomer.click();
             renderMsgModal('success', '¡Cliente Registrado!', response.data.msg, false, 1000); 
             setInterval(() => { location.reload() }, 1000);                
         } catch (error) {
             console.log('ERROR => ', error);
             renderMsgModal('error', 'Error', `${error.response.status}: ${error.response.statusText}`)
         }
     });
 }

/**
 * Query to Get a Customer from the database and show in modal
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
            document.getElementById('txtIdCustomerCellPhone').textContent = customer.cellPhone ? customer.cellPhone : '_____________';
            document.getElementById('txtIdCustomerWithCredit').textContent = customer.withCredit ? 'Con Credito' : 'Sin Credito';
            document.getElementById('txtIdCustomerAddress').textContent = customer.address ? customer.address : '_____________';
        }
    } catch (error) {
        console.log('ERROR => ', error);
        renderMsgModal('error', 'Error', `${error.response.status}: ${error.response.statusText}`);
    }    
}

/**
 * Query to show a Customer to Update the data
 */
 const showCustomerToUpdate = async (customerId) => {
    try {
        const url = `${location.origin}/customers/${customerId}`;
        const response = await axios.get(url);
        const {customer} = response.data; 
        const cardAlerts = document.getElementById('cardAlertsUpdate');
        removeAllAlerts(cardAlerts);

        document.getElementById('txtIdCustomerId').textContent = customer.id;
        document.getElementById('inputIdUpdateCustomerNames').value = customer.names;
        document.getElementById('inputIdUpdateCustomerLastNames').value = customer.lastNames;
        document.getElementById('inputIdUpdateCustomerCi').value = customer.ci;
        document.getElementById('inputIdUpdateCustomerCellPhone').value = customer.cellPhone===0 ? '': customer.cellPhone;
        document.getElementById('selectIdUpdateCustomerGender').value = customer.gender;
        document.getElementById('inputIdUpdateCustomerAddress').value = customer.address;
    } catch (error) {
        console.log('ERROR => ', error);
        renderMsgModal('error', 'Error', `${error.response.status}: ${error.response.statusText}`);
    }
}

/**
 * Query to Update a User from DB
 */
 const formIdUpdateCustomer = document.getElementById('formIdUpdateCustomer');
 if (formIdUpdateCustomer) {
     formIdUpdateCustomer.addEventListener('submit', async function(event) {
         event.preventDefault();
         const customerUpdateFormData = new FormData(event.currentTarget);
         const customerData = Object.fromEntries(customerUpdateFormData);
         const customerId = document.getElementById('txtIdCustomerId').textContent;
         const btnIdCloseUpdateCustomer = document.getElementById('btnIdCloseUpdateCustomer');
         customerData.id = customerId;
         try {
             const url = `${location.origin}/customers/${customerId}`;
             const response = await axios.put(url, customerData);
             const cardAlerts = document.getElementById('cardAlertsUpdate');
             const errors = response.data.errors;
             if (errors) {
                 return createDivAlerts(errors, cardAlerts);
             }
             removeAllAlerts(cardAlerts);
             formIdUpdateCustomer.reset();
             btnIdCloseUpdateCustomer.click();
             renderMsgModal('success', 'Cliente Actualizado!', response.data.msg, false, 1000);
             setInterval(() => { location.reload() }, 1000);
         } catch (error) {
             console.log('ERROR => ', error);
             renderMsgModal('error', 'Error', `${error.response.status}: ${error.response.statusText}`);
         }
 
     });
 }
 
/**
 * Query to Delete a Customer from DB
 */
 const deleteOneCustomer = async (customerId) =>{
    Swal.fire({
        title: '¿Está seguro de elminar al Cliente?',
        text: "¡No podrás revertir esto!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, Eliminar Cliente',
        cancelButtonText: 'Cancelar'
    }).then(async (result) => {
        if (result.isConfirmed) {
            try {
                const url = `${location.origin}/customers/${customerId}`;
                const response = await axios.delete(url);
                const {customer} = response.data;
                if (!customer[0]) {
                    return renderMsgModal('error', 'Error', response.data.msg);
                }
                renderMsgModal('success', 'Cliente Eliminado!', response.data.msg, false, 1000);            
                setInterval(() => { location.reload() }, 1000);
            } catch (error) {
                console.log('ERROR => ', error);
                renderMsgModal('error', 'Error', `${error.response.status}: ${error.response.statusText}`)
            } 

        }
    }); 
}