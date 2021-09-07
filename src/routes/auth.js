const { Router} = require('express');
const router = Router();

const { login, dashboard } = require('../controllers/auth');

router.get('/login', login);


module.exports = router;