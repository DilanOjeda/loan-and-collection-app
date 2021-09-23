
const {Loan, Customer} = require('../models')


const displayLoansView = (req, res) => {
    res.render('loans', {
        title: 'Prestamos'
    });
}

const displayCreateLoanView = async (req, res) => {
    try {
        const customers = await Customer.findAll({
            Attributes: ['id', 'names', 'lastNames', 'withCredit'],            
            where: {deletedStatus:false},
        })
        res.render('create-loan', {
            title: 'Crear Prestamo',
            customers
        });
    } catch (error) {
        console.log('ERROR => ', error);
        res.status(500).json({
            msg: 'Se produjo un error y no se pudo completar su solicitud. Inténtalo de nuevo.'
        });
    }
}
module.exports = {
    displayLoansView,
    displayCreateLoanView
}