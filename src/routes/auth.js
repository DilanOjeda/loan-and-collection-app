const { Router} = require('express');
const router = Router();

const { displayLogin ,closeSession } = require('../controllers/auth');
const { authenticateUser } = require('../middlewares/authenticateUser');


router.get('/login', displayLogin);

router.post('/login', authenticateUser);

router.get('/close-session', closeSession);

module.exports = router;