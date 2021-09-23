const { Router } = require('express');
const router = Router();

const { displayLoansView, displayCreateLoanView } = require('../controllers/loans');

router.get('/', displayLoansView);

router.get('/create-loan', displayCreateLoanView)

module.exports = router;