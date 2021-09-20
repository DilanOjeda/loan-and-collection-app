

export const removeAlert = (event) => {
    if (!event.target.classList.contains('btn-close-alert')) {
        return
    }
    event.target.parentElement.remove();
}

export const removeAllAlerts = (cardAlerts) => {
    while(cardAlerts.hasChildNodes()) {
        cardAlerts.removeChild(cardAlerts.firstChild);
    }
}