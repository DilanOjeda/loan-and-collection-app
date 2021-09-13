import axios from 'axios';

import { createDivAlerts } from '../functions/createDivAlerts';
import { renderMsgModal } from '../functions/renderMsgModal';
import { removeAlert, removeAllAlerts } from '../functions/removeAlerts';

const signUpForm = document.querySelector('#signUpForm');
const cardAlerts =document.querySelector('#cardAlerts');

if(cardAlerts) {
    cardAlerts.addEventListener('click', removeAlert);
}

if (signUpForm) {
    signUpForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const SignUpFormData = new FormData(event.currentTarget);
        const dataUser = Object.fromEntries(SignUpFormData);
        try {
            const url = `${location.origin}/users`;
            const response = await axios.post(url, dataUser);
            if (!response.data.errors) {
                removeAllAlerts();
                signUpForm.reset();
                renderMsgModal('success', '¡Usuario Creado!', response.data.msg);
            } else {
                const errors = response.data.errors;
                createDivAlerts(errors, cardAlerts);
            }
        } catch (error) {
            renderMsgModal('error', 'Error', `${error.response.status}: ${error.response.statusText}`);
        }
 
    });
}