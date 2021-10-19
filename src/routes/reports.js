const {Router} = require('express');
const router = Router();

const {displayLoanDetailsReport} = require('../controllers/reports');

router.get('/loan-details-report', displayLoanDetailsReport)

module.exports = router;