
import {DataTable} from 'simple-datatables';

export const createDataTable = (tableId, usersDataTable, moduleName) =>{
    return new DataTable(tableId, {
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

export const createSimpleDataTable = (tableId, moduleName) => {
    const dataTable = new DataTable(tableId, {
        labels: {
            placeholder: "Buscar...",
            perPage: "{select} registros por página",
            noRows: "Resgistros no encontrados",
            info: `Mostrando {start} a {end} de {rows} ${moduleName} (Página {page} de {pages} Páginas)`,
        },
    });
}