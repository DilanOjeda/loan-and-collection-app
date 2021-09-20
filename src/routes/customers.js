const { Router } = require('express');
const router = Router();

const { displayCustomersView } = require('../controllers/customers');

router.get('/', displayCustomersView);

module.exports = router;