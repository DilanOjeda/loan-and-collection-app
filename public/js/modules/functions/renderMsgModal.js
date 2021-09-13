
import Swal from 'sweetalert2';

export const  renderMsgModal = (icon, title, text) => {
    Swal.fire({
        icon: icon,
        title: title,
        text: text
    });
}