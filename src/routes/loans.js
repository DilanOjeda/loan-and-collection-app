const { Router } = require('express');
const router = Router();

const { displayLoansView, 
    displayCreateLoanView,
    createLoan
 } = require('../controllers/loans');

router.get('/', displayLoansView);

router.get('/create-loan', displayCreateLoanView);

router.post('/', createLoan);

module.exports = router;