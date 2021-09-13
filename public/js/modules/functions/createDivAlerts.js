import { removeAllAlerts } from "./removeAlerts";

export const createDivAlerts = (errors, cardAlerts) => {
    const fragmentAlerts = document.createDocumentFragment();
    errors.forEach((error, i) => {
        const divCardAlert = document.createElement('div');
        divCardAlert.classList.add('card-alert', 'alert-danger');
        const msgAlert = document.createElement('p');
        msgAlert.textContent = error.msg;
        divCardAlert.appendChild(msgAlert);
        const btnCloseAlert =document.createElement('span');
        btnCloseAlert.setAttribute('class', 'btn-close-alert');
        btnCloseAlert.innerHTML = '&times;';
        divCardAlert.appendChild(btnCloseAlert); 
        fragmentAlerts.appendChild(divCardAlert);
    });
    removeAllAlerts();
    cardAlerts.appendChild(fragmentAlerts);
}


