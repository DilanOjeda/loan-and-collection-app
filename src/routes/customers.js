const { Router } = require('express');
const router = Router();

const { displayCustomersView, getCustomer } = require('../controllers/customers');

router.get('/', displayCustomersView);

router.get('/:id', getCustomer);

module.exports = router;