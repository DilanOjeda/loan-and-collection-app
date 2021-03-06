const { Op } = require('sequelize');
const  { Customer }  = require('../models');


const validateCustomerCi = async (ci = '') => {
    const existCi = await Customer.findOne({
        where: {ci}
    });
    if (existCi) {
        throw new Error(`El carnet de identidad del Cliente ya existe.`);
    }
}

const validateCustomerCiToUpdate = async (ci, {req}) => {
    const {id} = req.body;
    const existCi = await Customer.findOne({
        where: {
            [Op.and]: [
                { id: { [Op.ne]: id } }, 
                { ci: ci }
            ],
        }
    });
    if (existCi) {
        throw new Error(`El carnet de identidad del Cliente ingresado ya existe.`);
    }
}

const validateCustomerId = async (id = '') => {
    const existCustomerId = await Customer.findByPk(id);
    if (!existCustomerId) {
        throw new Error(`El Cliente no existe, seleccionÃ© otro Cliente registrado.`);
    }
}

module.exports = {
    validateCustomerCi,
    validateCustomerCiToUpdate,
    validateCustomerId
}