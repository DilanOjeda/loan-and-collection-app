const { Router }  = require('express');
const router = Router();
const { check } = require('express-validator');

const { 
    displayDashboardView, 
    displaySignUpView, 
    displayUsersView, 
    getUser, 
    getUsers, 
    createUser, 
    updateUser, 
    deleteUser,
    enableOrDisableUser } = require('../controllers/users');
const { validateCreateUser, validateUpdateUser } = require('../validators/users');
const { verifyUserAuthentication } = require('../controllers/auth');
// Display components
router.get('/dashboard', verifyUserAuthentication, displayDashboardView);
router.get('/signup', displaySignUpView);
router.get('/admin', verifyUserAuthentication, displayUsersView);

// Functionalities
router.get('/', getUsers);

router.get('/:id', getUser);

router.post('/', validateCreateUser, createUser);

router.put('/:id', validateUpdateUser, updateUser);

router.delete('/:id', deleteUser);

router.put('/enable-user/:id', enableOrDisableUser);

module.exports = router; 
