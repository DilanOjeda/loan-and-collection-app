const { Router } = require('express');
const router = Router();

const { displayCollectionsView } = require('../controllers/collections');
router.get('/', displayCollectionsView)

module.exports = router;