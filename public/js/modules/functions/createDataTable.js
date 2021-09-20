
import {DataTable} from 'simple-datatables';

export const createDataTable = (tableIdUsers, usersDataTable, moduleName) =>{
    return new DataTable(tableIdUsers, {
        header: true,
        layout: {
            top: "{select}{search}",
        },
        labels: {
            placeholder: "Buscar...",
            perPage: "{select} registros por página",
            noRows: "Resgistros no encontrados",
            info: `Mostrando {start} a {end} de {rows} ${moduleName} (Página {page} de {pages} Páginas)`,
        },
        data: usersDataTable,
    });
}

export const destroyTable = (tableIdUsers) => {
    const dataTable = new DataTable(tableIdUsers);
    dataTable.destroy();
}