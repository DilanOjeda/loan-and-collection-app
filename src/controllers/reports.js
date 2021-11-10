
const PDFDocument = require('pdfkit-construct');

const {Loan, Customer, Fee} = require('../models');
const {generateHeaderLoanDetails, generateTableLoanFees} = require('../helpers/generateReports');
const { response } = require('express');

/**
 * Show loan details view of reports module
 */
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

/**
 * Generate loan details report pdf
 */
const generateLoanDetailsReport = async (req, res=response) =>{
    try {
        const {id} = req.params;
        const loanQuery = await Loan.findOne({
            where: {id:id},
            include:[
                { model: Customer, attributes: ['names', 'lastNames']},
                { model: Fee, as: 'fees', attributes: ['feeAmount', 'numberFee', 'feeStatus', 'feePaymentDate'] }
            ],
            order: [['fees','feePaymentDate']]
        });
        if (!loanQuery) {
            return res.json({
                msg: 'Ocurrió un error al obtener los datos del Prestamo.',
            });
        }

        const {fees, customer, ...loan} = loanQuery.dataValues;

        const margins = { top: 20, bottom: 40, left: 80, right: 50};
        let doc = new PDFDocument({ margins });
        generateHeaderLoanDetails(doc, customer, loan);
        generateTableLoanFees(doc, fees);
        doc.render();
        doc.pipe(res);
        doc.end();

    } catch (error) {
        console.log('ERROR => ', error);
        res.json({
            msg: 'Se produjo un error y no se pudo completar su solicitud. Inténtalo de nuevo.'
        });
    }
}
/**
 * Show loan details view of reports module
 */

const displayLoansDateRangeReport = async (req, res) => {
    res.render('reports/loan-data-range-report', {
        title: 'Reportes'
    });
}

//TODO: Create a the function below.
/**
 * Generate loans or collections report pdf according  to date range
 */

// generateLoanOrCollectionsReport

module.exports = {
    displayLoanDetailsReport,
    generateLoanDetailsReport,
    displayLoansDateRangeReport
}