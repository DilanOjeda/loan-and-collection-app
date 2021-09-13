const { Router }  = require('express');
const router = Router();

const { displayDashboard, displaySignUp, getUser, getUsers, createUser, updateUser, deleteUser } = require('../controllers/users');
const { validateCreateUser } = require('../validators/users');

// Display components
router.get('/dashboard', displayDashboard);
router.get('/signup', displaySignUp);


// CRUD
router.get('/', getUsers);

router.get('/:id', getUser);

router.post('/', validateCreateUser, createUser);

router.put('/:id');

router.delete('/:id');

module.exports = router; 
