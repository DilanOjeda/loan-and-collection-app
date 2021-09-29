const { Router } = require('express');
const router = Router();

const { displayCollectionsView, displayCollectFees } = require('../controllers/collections');

router.get('/', displayCollectionsView)

router.get('/collect-fees', displayCollectFees);

module.exports = router;