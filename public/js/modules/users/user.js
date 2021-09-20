import axios from 'axios';
import Swal  from 'sweetalert2';

import {createDataTable as dataTableUsers, destroyTable} from '../functions/createDataTable';
import {renderMsgModal} from '../functions/renderMsgModal';
import {createDivAlerts} from '../functions/createDivAlerts';
import {removeAllAlerts} from '../functions/removeAlerts';

document.addEventListener('DOMContentLoaded', function () {
    const tableIdUsers = document.querySelector("#tableIdUsers");
    if(tableIdUsers){
        loadUsersTable(tableIdUsers);

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
                }
            }
        });
    }

});

/**
 *  Query to get users from DB to load a table
 */
const loadUsersTable = async (tableIdUsers) => {
    try {
        const url = `${location.origin}/users`;
        const response = await axios.get(url);
        const { users } = response.data;
        if(users) {
            const headings = ["#", "Nombres", "Apellidos", "C.I.", "Usuario", "Celular", "Tipo de U.", "Estado", "Acciones"];
            const usersData = [];
            users.forEach((user, i) => {
                user.enabled = user.enabled ? 'Disponible' : 'No Disponible';
                user.cellPhone = user.cellPhone === 0 ? '' : user.cellPhone;
                user = Object.values(user);
                const userId = user.shift();
                user.splice(0, 0, ++i)
                const roleRemoved = user.pop();
                user.splice(user.length-1 , 0, roleRemoved.name)
                user.push(`
                <button id="${userId}" userId=show_${userId}  type="button" class="btn btn-info btn-sm " data-bs-toggle="modal" data-bs-target="#userCardInfo">Ver</button>
                <button id="${userId}" userId=update_${userId} type="button" class="btn btn-warning btn-sm" data-bs-toggle="modal" data-bs-target="#userUpdateModal">Editar</button>
                <button id="${userId}" userId=delete_${userId} type="button" class="btn btn-danger btn-sm">Eliminar</button>`
                );
                usersData.push(user);
            });
            let usersDataTable = {
                "headings": headings,
                "data": usersData
            }
            dataTableUsers(tableIdUsers, usersDataTable, 'Usuarios');
        }
    } catch (error) {
        console.log('ERROR => ', error);
        renderMsgModal('error', 'Error', `${error.response.status}: ${error.response.statusText}`)
    }
}

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
            document.getElementById('cellPhoneTextId').textContent = user.cellPhone;
            document.getElementById('enabledTextId').textContent = user.enabled ? 'Disponible' : 'No Disponible';
            document.getElementById('addressTextId').textContent = user.address ? user.address : 'Sin Dirección';
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
            if (response.data.errors) {
                const errors = response.data.errors;
                return createDivAlerts(errors, cardAlerts);
            }
            removeAllAlerts(cardAlerts);
            modalUpdateId.reset();
            btnCloseUpdateUser.click();
            renderMsgModal('success', '¡Usuario Actualizado!', response.data.msg);
        } catch (error) {
            console.log('ERROR => ', error);
            renderMsgModal('error', 'Error', `${error.response.status}: ${error.response.statusText}`);
        }

    });
}
