const {Router} = require('express');
const router = Router();

const {displayLoanDetailsReport, generateLoanDetailsReport} = require('../controllers/reports');

router.get('/loan-details-report', displayLoanDetailsReport);

router.get('/download-loan-details-report/:id', generateLoanDetailsReport)

module.exports = router;