const { Router } = require('express');
const router = Router();

const { displayCollectionsView, displayCollectFees, collectFees } = require('../controllers/collections');
const { verifyUserAuthentication } = require('../controllers/auth');

router.get('/', verifyUserAuthentication, displayCollectionsView)

router.get('/collect-fees', verifyUserAuthentication, displayCollectFees);

router.post('/collect-fees', collectFees);


module.exports = router;