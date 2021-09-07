const { Router }  = require('express');
const router = Router();

const { dashboard, getUser, getUsers, createUser, updateUser, deleteUser } = require('../controllers/users');


router.get('/dashboard', dashboard);


router.get('/', getUsers);

router.get('/id:');

router.post('/');

router.put('/:id');

router.delete('/:id');

module.exports = router; 
