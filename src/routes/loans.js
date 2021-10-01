const { Router } = require('express');
const router = Router();

const {validateLoan} = require('../validators/loans');

const { 
    displayLoansView, 
    displayCreateLoanView,
    createLoan,
    getLoan
} = require('../controllers/loans');
const { verifyUserAuthentication } = require('../controllers/auth');

router.get('/', verifyUserAuthentication, displayLoansView);

router.get('/create-loan', verifyUserAuthentication, displayCreateLoanView);

router.post('/', validateLoan, createLoan);

router.get('/:id', getLoan);


module.exports = router;