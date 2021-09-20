const { Router }  = require('express');
const router = Router();
const { check } = require('express-validator');

const { displayDashboardView, displaySignUpView, displayUsersView, getUser, getUsers, createUser, updateUser, deleteUser } = require('../controllers/users');
const { validateCreateUser, validateUpdateUser } = require('../validators/users');

// Display components
router.get('/dashboard', displayDashboardView);
router.get('/signup', displaySignUpView);
router.get('/admin', displayUsersView);

// CRUD
router.get('/', getUsers);

router.get('/:id', getUser);

router.post('/', validateCreateUser, createUser);

router.put('/:id', validateUpdateUser, updateUser);

router.delete('/:id', deleteUser);

module.exports = router; 
