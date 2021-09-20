const { Router } = require('express');
const router = Router();

const { displayLoansView } = require('../controllers/loans');

router.get('/', displayLoansView)

module.exports = router;