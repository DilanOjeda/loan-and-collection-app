const { Router } = require('express');
const router = Router();

const { customers } = require('../controllers/customers');

router.get('/', customers);

module.exports = router;