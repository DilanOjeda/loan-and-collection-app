import axios from 'axios';
import Swal  from 'sweetalert2';

import {createSimpleDataTable} from './functions/createDataTable';
import {renderMsgModal} from './functions/renderMsgModal';
import {createDivAlerts} from './functions/createDivAlerts';
import {removeAllAlerts} from './functions/removeAlerts';

document.addEventListener('DOMContentLoaded', function () {
    const tableIdUsers = document.querySelector("#tableIdUsers");
    if(tableIdUsers){
        createSimpleDataTable(tableIdUsers, 'Usuarios');
        tableIdUsers.addEventListener('click', function(event) {
            if (event.target.getAttribute('userId')) {
                const [btnAction, userId] = event.target.getAttribute('userId').split('_');
                switch (btnAction) {
                    case 'show':
                        showOneUser(userId)
                        break;
                    case 'update':
                        console.log('update --->', userId);
                        showUserToUpdate(userId);
                        break;
                    case 'delete':
                        deleteOneUser(userId);
                        break;
                    case 'enabled':
                        console.log('enabled --->', userId);
                        enableOrDisableUser(userId);
                        break;
                }
            }
        });
    }

});

/**
 * Query to sign up a new User 
 */
const modalSignUpId = document.getElementById('modalSignUpId');
if (modalSignUpId) {
    modalSignUpId.addEventListener('submit', async function(event) {
        event.preventDefault();
        const userFormData = new FormData(event.currentTarget);
        const userData = Object.fromEntries(userFormData);
        const btnCloseSignUpUser = document.getElementById('btnCloseSignUpUser');
        
        try {
            const url = `${location.origin}/users`;
            const response = await axios.post(url, userData);
            const cardAlerts = document.getElementById('cardAlerts');
            if (response.data.errors) {
                const errors = response.data.errors;
                return createDivAlerts(errors, cardAlerts);
            }
            removeAllAlerts(cardAlerts);
            modalSignUpId.reset();
            btnCloseSignUpUser.click();
            renderMsgModal('success', '¡Usuario Registrado!', response.data.msg);                 
        } catch (error) {
            console.log('ERROR => ', error);
            renderMsgModal('error', 'Error', `${error.response.status}: ${error.response.statusText}`)
        }
    });
}

/**
 * Query to Get a user from the database and show in modal
 */
const showOneUser = async (userId) => {
    try {
        const url = `${location.origin}/users/${userId}`;
        const response = await axios.get(url);
        const {user} = response.data; 
        if (user) {
            document.getElementById('fullnameTextId').textContent = `${user.names} ${user.lastNames}`;
            document.getElementById('roleTextId').textContent = user.role.name;
            document.getElementById('ciTextId').textContent = user.ci;
            document.getElementById('usernameTextId').textContent = user.username;
            document.getElementById('genderTextId').textContent = user.gender;
            document.getElementById('cellPhoneTextId').textContent = user.cellPhone? user.cellPhone : '_____________';
            document.getElementById('enabledTextId').textContent = user.enabled ? 'Disponible' : 'No Disponible';
            document.getElementById('addressTextId').textContent = user.address ? user.address : '_____________';
        }
    } catch (error) {
        console.log('ERROR => ', error);
        renderMsgModal('error', 'Error', `${error.response.status}: ${error.response.statusText}`);
    }    
}

/**
 * Query to Delete a User from DB
 */
const deleteOneUser = async (userId) =>{
    Swal.fire({
        title: '¿Está seguro de elminar al Usuario?',
        text: "¡No podrás revertir esto!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, Eliminar Usuario',
        cancelButtonText: 'Cancelar'
    }).then(async (result) => {
        if (result.isConfirmed) {
            try {
                const url = `${location.origin}/users/${userId}`;
                const response = await axios.delete(url);
                if (!response.data.user[0]) {
                    return renderMsgModal('error', 'Error', response.data.msg);
                }
                renderMsgModal('success', '¡Usuario Eliminado!', response.data.msg);            
            } catch (error) {
                renderMsgModal('error', 'Error', `${error.response.status}: ${error.response.statusText}`)
                console.log('ERROR => ', error);
            }

        }
    }); 
}

/**
 * Query to show a User
 */
const showUserToUpdate = async (userId) => {
    try {
        const url = `${location.origin}/users/${userId}`;
        const response = await axios.get(url);
        const {user} = response.data; 
        const cardAlerts = document.getElementById('cardAlertsUpdate');
        removeAllAlerts(cardAlerts);
        document.getElementById('inputUserId').textContent = user.id;
        document.getElementById('inputNamesUpdate').value = user.names;
        document.getElementById('inputLastNamesUpdate').value = user.lastNames;
        document.getElementById('inputCiUpdate').value = user.ci;
        document.getElementById('inputCellPhoneUpdate').value = user.cellPhone===0 ? '': user.cellPhone;
        document.getElementById('selectGenderUpdate').value = user.gender;
        document.getElementById('selectRoleUpdate').value = user.role.id;
        document.getElementById('inputAddressUpdate').value = user.address;
        document.getElementById('inputUsernameUpdate').value = user.username;
    } catch (error) {
        console.log('ERROR => ', error);
        renderMsgModal('error', 'Error', `${error.response.status}: ${error.response.statusText}`);
    }
}

/**
 * Query to Update a User from DB
 */
const modalUpdateId = document.getElementById('modalUpdateId');
if (modalUpdateId) {
    modalUpdateId.addEventListener('submit', async function(event) {
        event.preventDefault();
        const userUpdateFormData = new FormData(event.currentTarget);
        const userData = Object.fromEntries(userUpdateFormData);
        console.log('userData', userData);
        const userId = document.getElementById('inputUserId').textContent;
        const btnCloseUpdateUser = document.getElementById('btnCloseUpdateUser');
        userData.id = userId;
        try {
            const url = `${location.origin}/users/${userId}`;
            const response = await axios.put(url, userData);
            console.log(response.data);
            const cardAlerts = document.getElementById('cardAlertsUpdate');
            const errors = response.data.errors;
            if (errors) {
                return createDivAlerts(errors, cardAlerts);
            }
            removeAllAlerts(cardAlerts);
            modalUpdateId.reset();
            btnCloseUpdateUser.click();
            renderMsgModal('success', '¡Usuario Actualizado!', response.data.msg, false, 1000);
            setInterval(() => { location.reload() }, 1000);
        } catch (error) {
            console.log('ERROR => ', error);
            renderMsgModal('error', 'Error', `${error.response.status}: ${error.response.statusText}`);
        }

    });
}


const enableOrDisableUser = async (userId) => {
    if (userId) {
        const btnEnableUser = document.getElementById(userId);
        btnEnableUser.setAttribute('disabled', true);
        const btnSpinner = btnEnableUser.firstElementChild;
        btnSpinner.classList.add('spinner-border');
        let buttonEnable = {};
        if (btnEnableUser.textContent.trim() === 'Habilitado') {
            buttonEnable.status = false;
            buttonEnable.className = 'btn-outline-danger';
            buttonEnable.btnText = 'Deshabilitado';
        }
        else if(btnEnableUser.textContent.trim() === 'Deshabilitado') {
            buttonEnable.status = true;
            buttonEnable.className = 'btn-outline-success';
            buttonEnable.btnText = 'Habilitado';
        }
        else return renderMsgModal('success', ' No existe el boton seleccionando.', response.data.msg);
        try {
            const url = `${location.origin}/users/enable-user/${userId}`;
            const response = await axios.put(url, {enabled:buttonEnable.status});
            const {user} = response.data;
            if (!user[0]) {
                return renderMsgModal('success', ' No existe el boton seleccionando.', response.data.msg);
            }
            btnSpinner.classList.remove('spinner-border');
            btnEnableUser.className = `btn ${buttonEnable.className} btn-sm`;
            const spanSpinner = document.createElement('span');
            spanSpinner.classList.add('spinner-border-sm');
            btnEnableUser.textContent = buttonEnable.btnText;
            btnEnableUser.appendChild(spanSpinner);
            btnEnableUser.removeAttribute('disabled');
        } catch (error) {
            console.log('ERROR => ', error);
            renderMsgModal('error', 'Error', `${error.response.status}: ${error.response.statusText}`);
        }
    }
}