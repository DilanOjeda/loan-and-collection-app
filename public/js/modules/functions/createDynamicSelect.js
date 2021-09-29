import Choices from "choices.js";

export const createDynamicSelect = (selectId) => {
    new Choices(selectId, {
        loadingText: 'Cargando...',
        noResultsText: 'No se han encontrado resultados',
        noChoicesText: 'No hay opciones para elegir',
        itemSelectText: 'Presione para seleccionar',
    });
}


