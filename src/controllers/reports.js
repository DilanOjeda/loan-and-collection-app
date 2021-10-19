const {Loan, Customer} = require('../models');



const displayLoanDetailsReport = async (req, res) => {
    try {
        const loans = await Loan.findAll({
            include: {
                model: Customer,
                attributes: ['names', 'lastNames']
            },
        });
        res.render('reports/loan-details-report', {
            title: 'Reportes',
            loans
        });
    } catch (error) {
        console.log('ERROR => ', error);
        res.status(500).json({
            msg: 'Se produjo un error y no se pudo completar su solicitud. Inténtalo de nuevo.'
        });
    }

    
}


module.exports = {
    displayLoanDetailsReport,
}