const { Router } = require('express');
const router = Router();

const { 
    displayCustomersView, 
    getCustomer, 
    createCustomer,
    updateCustomer, 
    deleteCustomer } = require('../controllers/customers');
const { validateCreateCustomer, validateUpdateCustomer } = require('../validators/customers');
router.get('/', displayCustomersView);

router.get('/:id', getCustomer);

router.post('/', validateCreateCustomer, createCustomer);

router.put('/:id', validateUpdateCustomer, updateCustomer);

router.delete('/:id', deleteCustomer);


module.exports = router;