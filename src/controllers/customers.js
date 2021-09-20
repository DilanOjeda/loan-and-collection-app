

const {Customer} = require('../models')

const displayCustomersView = async (req, res) => {
    try {
        const customers = await Customer.findAll();
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
        console.log('id =>', req.params)
        const customer = await Customer.findByPk(id);
        if (customer) {
            return res.json({
                customer
            });
        }
    } catch (error) {
        console.log('ERROR => ', error);
        res.json({
            msg: 'Ocurrió un error al obtener los usurios.'
        });
    }
}

module.exports = {
    displayCustomersView,
    getCustomer,
}