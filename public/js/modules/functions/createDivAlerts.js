import { removeAllAlerts } from "./removeAlerts";

export const createDivAlerts = (errors, cardAlerts) => {
    const fragmentAlerts = document.createDocumentFragment();
    errors.forEach((error, i) => {
        const divCardAlert = document.createElement('div');
        divCardAlert.classList.add('alert', 'alert-danger', 'alert-dismissible', 'fade', 'show', 'mb-1');
        const btnCloseAlert = document.createElement('button');
        btnCloseAlert.setAttribute('type', 'button');
        btnCloseAlert.setAttribute('data-bs-dismiss', 'alert');
        btnCloseAlert.setAttribute('aria-label', 'Close');
        btnCloseAlert.classList.add('btn-close');
        divCardAlert.textContent = error.msg;
        divCardAlert.appendChild(btnCloseAlert); 
        fragmentAlerts.appendChild(divCardAlert);
    });
    removeAllAlerts(cardAlerts);
    cardAlerts.appendChild(fragmentAlerts);
}
