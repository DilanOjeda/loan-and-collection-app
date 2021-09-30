
const {Loan, Customer, Fee} = require('../models')
const connectionDB = require('../../config/db/connection');

const displayLoansView = async (req, res) => {
    try {
        const loans = await Loan.findAll({
            include: {
                model: Customer,
                attributes: ['names', 'lastNames']
            },
        });
        res.render('loans', {
            title: 'Prestamos',
            loans

        });
    } catch (error) {
        console.log('ERROR => ', error);
        res.status(500).json({
            msg: 'Se produjo un error y no se pudo completar su solicitud. Inténtalo de nuevo.'
        });
    }
}

const displayCreateLoanView = async (req, res) => {
    try {
        const customers = await Customer.findAll({
            attributes: ['id', 'names', 'lastNames', 'withCredit'],            
            where: {deletedStatus:false},
        });
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

const createLoan = async (req, res) => {
    const t = await connectionDB.transaction();
    const {creditAmount, interestRate, numberFees, feeAmount, modality, loanDate, detail='', customerId} = req.body;
    const feesList = [];
    const feesDates = req.body.feesDates.split(', ').sort((a, b) => new Date(b) - new Date(a)).reverse();
    try {
        const loan = await Loan.create({creditAmount, interestRate, numberFees, feeAmount, modality, loanDate, customerId}, 
            { transaction: t });    

            feesDates.forEach((date, i) => feesList.push({feeAmount, numberFee: ++i, feePaymentDate: date, loanId:loan.id}));
        const fees = await Fee.bulkCreate(feesList, { transaction: t });

        await Customer.update({withCredit: true}, {where: {id: customerId}, transaction: t});

        await t.commit();
        if (!(loan && fees) ) {
            return res.json({
                msg: 'No se pudo registrar el Prestamo, Inentalo de nuevo.',
                loan
            });
        }
        res.json({
            msg: 'El Prestamo fue registrado exitosamente',
            loan: req.body,
            feesDates
        });
    } catch (error) {
        await t.rollback();
        console.log('ERROR => ', error);
        res.status(500).json({
            msg: 'Se produjo un error y no se pudo completar su solicitud. Inténtalo de nuevo.'
        });
    }
}

const getLoan = async (req, res) => {
    try {
        const {id} = req.params;
        const loan = await Loan.findOne({
            where: {id:id},
            include:[
                {
                    model: Customer,
                    attributes: ['names', 'lastNames']
                },
                {
                    model: Fee,
                    as: 'fees',
                    attributes: ['id', 'feeAmount', 'numberFee', 'feeStatus', 'feePaymentDate'],
                }
            ],
            order: [['fees','feePaymentDate']]

        });
        if (!loan) {
            return res.json({
                msg: 'Ocurrió un error al obtener los datos del Prestamo.',
                loan
            });
        }
        return res.json({
            msg: 'Los datos del Prestamo fueron obtenidos exitosamente.',
            loan
        });
    } catch (error) {
        console.log('ERROR => ', error);
        res.json({
            msg: 'Ocurrió un error al obtener los datos del Prestamo.'
        });
    }
}
module.exports = {
    displayLoansView,
    displayCreateLoanView,
    createLoan,
    getLoan
}