const { Router } = require('express');
const router = Router();

const {validateLoan} = require('../validators/loans');

const { displayLoansView, 
    displayCreateLoanView,
    createLoan,
    getLoan
 } = require('../controllers/loans');

router.get('/', displayLoansView);

router.get('/create-loan', displayCreateLoanView);

router.post('/', validateLoan, createLoan);

router.get('/:id', getLoan);


module.exports = router;