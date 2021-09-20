
import Swal from 'sweetalert2';

export const  renderMsgModal = (icon, title, text, showConfirmButton=true, timer=false) => {
    Swal.fire({
        icon: icon,
        title: title,
        text: text,
        showConfirmButton: showConfirmButton,
        timer: timer
    });
}