
const {Customer, Loan, Fee} = require('../models');
const { Op } = require('sequelize');
const connectionDB = require('../../config/db/connection');

const {format} = require('date-fns');

const displayCollectionsView = async (req, res) => {
    try {
        const fees = await Fee.findAll({
            where: {feeStatus:true},
            include:[
                {
                    model: Loan,
                    where: {loanStatus: false},
                    include: [{
                        model: Customer,
                        attributes: ['names', 'lastNames']
                    }]
                }
            ],
        });
        res.render('collections', {
            title: 'Cobranzas',
            fees
        });
    } catch (error) {
        console.log('ERROE => ', error);
        res.json({
            msg: 'Something went wrong'
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
            msg: 'Something went wrong'
        });
    }
}

const collectFees = async (req, res) => {
    const t = await connectionDB.transaction();
    try {
        const {loanId, fees, totalPaidFees} = req.body;
        const paidFees = await Fee.update({feeStatus: true, customerPaymentDate: new Date()}, {
            where: {
                [Op.and]: [
                    { id: {[Op.in]: fees}  },
                    { loanId: loanId }, 
                ],
            },
            transaction: t
        });

        t.afterCommit( async () => {
            const verifyLoan = await Fee.findAll({
                where: {
                    [Op.and]: [
                        {feeStatus: false},
                        {loanId: loanId}
                    ]
                }
            });
            if (!(verifyLoan.length > 0)) {
                console.log('There are not unpaid fees', verifyLoan.length)
                const loanPaid = await Loan.update({loanStatus: true}, {where: {id: loanId}});
                if (loanPaid[0]) {
                    return res.json({
                        loanPaid,
                        msg: 'El prestamo fue cancelado por completo.'
                    });
                }
            }
            return res.json({
                paidFees,
                msg: 'El cobro de las cuotas se registro satisfactoriamente.'
            });
        });
        await t.commit();
    } catch (error) {
        await t.rollback();
        console.log('ERROE => ', error);
        res.json({
            msg: 'Something went wrong'
        });
    }
}

module.exports = {
    displayCollectionsView,
    displayCollectFees,
    collectFees
}