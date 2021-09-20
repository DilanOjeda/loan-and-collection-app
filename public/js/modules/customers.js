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
    }

});