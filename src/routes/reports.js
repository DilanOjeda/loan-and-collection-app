const {Router} = require('express');
const router = Router();

const {displayLoanDetailsReport, generateLoanDetailsReport, displayLoansDateRangeReport} = require('../controllers/reports');

router.get('/loan-details-report', displayLoanDetailsReport);
router.get('/download-loan-details-report/:id', generateLoanDetailsReport)

router.get('/loan-data-range-report', displayLoansDateRangeReport);

module.exports = router;