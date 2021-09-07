const { Router } = require('express');
const router = Router();

const { getLoans } = require('../controllers/loans');

router.get('/', getLoans)

module.exports = router;