
const {Customer, Loan, Fee} = require('../models');
const { Op } = require('sequelize');

const displayCollectionsView = async (req, res) => {
    try {
        const loans = await Loan.findAll({
            where: {loanStatus:false},
            include:[
                {
                    model: Customer,
                    attributes: ['names', 'lastNames']
                },
                {
                    model: Fee,
                    as: 'fees',
                    attributes: ['feeAmount', 'numberFee', 'feeStatus', 'feePaymentDate'],
                }
            ],
            order: [['fees','feePaymentDate']]
        });

        res.render('collections', {
            title: 'Cobranzas',
            loans
        });
    } catch (error) {
        console.log('ERROE => ', error);
        res.json({
            message: 'Something went wrong'
        });
    }
}

const displayCollectFees = async (req, res) => { 
    try {
        const loans = await Loan.findAll({
            where: {loanStatus:false},
            include:[
                {
                    model: Customer,
                    attributes: ['names', 'lastNames']
                },
                {
                    model: Fee,
                    as: 'fees',
                    attributes: ['feeAmount', 'numberFee', 'feeStatus', 'feePaymentDate'],
                }
            ],
            order: [['fees','feePaymentDate']]
        });

        res.render('collect-fees', {
            title: 'Cobranzas',
            loans
        });
    } catch (error) {
        console.log('ERROE => ', error);
        res.json({
            message: 'Something went wrong'
        });
    }
}
module.exports = {
    displayCollectionsView,
    displayCollectFees
}