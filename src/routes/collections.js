const { Router } = require('express');
const router = Router();

const { displayCollectionsView, displayCollectFees, collectFees } = require('../controllers/collections');

router.get('/', displayCollectionsView)

router.get('/collect-fees', displayCollectFees);

router.post('/collect-fees', collectFees);


module.exports = router;