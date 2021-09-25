const { Router } = require('express');
const router = Router();

const {validateLoan} = require('../validators/loans');

const { displayLoansView, 
    displayCreateLoanView,
    createLoan
 } = require('../controllers/loans');

router.get('/', displayLoansView);

router.get('/create-loan', displayCreateLoanView);

router.post('/', validateLoan, createLoan);

module.exports = router;