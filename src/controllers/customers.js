

const {Customer} = require('../models')
const {Op} = require('sequelize');

const displayCustomersView = async (req, res) => {
    try {
        const customers = await Customer.findAll({
            where:{deletedStatus: false},
            order: [
                ['updatedAt', 'DESC'],
            ],
        });
        res.render('customers', {
            title: 'Clientes',
            customers
        });
    } catch (error) {
        console.log('ERROE => ', error);
        res.json({
            message: 'Something went wrong'
        });
    }
} 


const getCustomer = async (req, res) => {
    try {
        const {id} = req.params;
        const customer = await Customer.findByPk(id);
        if (customer) {
            return res.json({
                customer
            });
        }
    } catch (error) {
        console.log('ERROR => ', error);
        res.json({
            msg: 'Ocurrió un error al obtener los datos del Cliente.'
        });
    }
}

const createCustomer = async (req, res) => {
    try {
        const {names, lastNames, ci, gender, cellPhone=null, address=null, img=null} = req.body;
        const customer = await Customer.create({names, lastNames, ci, gender, cellPhone, address, img});
        if (!customer) {
            return res.json({
                msg: 'No se pudo registrar al Cliente, Inentalo de nuevo.',
                customer
            });
        }
        res.json({
            msg: 'El Cliente fue registrado exitosamente',
            customer
        });
    } catch (error) {
        console.log('ERROR => ', error);
        res.status(500).json({
            msg: 'Se produjo un error y no se pudo completar su solicitud. Inténtalo de nuevo.'
        });
    }
};

const updateCustomer = async (req, res) => {
    try {
        const {id, names, lastNames, ci, gender, cellPhone=null, address=null, img=null} = req.body;
        const customer = await Customer.update({names, lastNames, ci, gender, cellPhone, address, img}, {
            where: {id:id}
        });
        if (!customer[0]) {
            return res.json({
                user: customer,
                msg: 'El Cliente No ha sido actualizado. Inténtalo de nuevo.'
            });
        }
        res.json({
            user: customer,
            msg: 'Los datos del Cliente han sido actualizados satisfactoriamente.'
        });

    } catch (error) {
        console.log('ERROR => ', error);
        res.status(500).json({
            msg: 'Se produjo un error y no se pudo completar su solicitud. Inténtalo de nuevo.'
        });
    }
};

const deleteCustomer = async (req, res) => {
    try {
        const {id} = req.params;
        const customer = await Customer.update({deletedStatus:true }, {
            where: {id:id}
        });
        if (!customer[0]) {
            return res.json({
                customer,
                msg: 'El cliente NO ha sido eliminado. Inténtalo de nuevo.'
            });
        }
        res.json({
            customer,
            msg: 'El cliente ha sido eliminado satisfactoriamente.'
        });
    } catch (error) {
        console.log('ERROR => ', error);
        res.status(500).json({
            msg: 'Se produjo un error y no se pudo completar su solicitud. Inténtalo de nuevo.'
        });
    }
};

module.exports = {
    displayCustomersView,
    getCustomer,
    createCustomer,
    updateCustomer,
    deleteCustomer,
}