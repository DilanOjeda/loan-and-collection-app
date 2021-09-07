const { Router } = require('express');
const router = Router();

const { getCollections } = require('../controllers/collections');
router.get('/', getCollections)

module.exports = router;