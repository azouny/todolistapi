const express = require('express');

const usersController = require('../controllers/users.controller');
const { checkAuth } = require('../middleware/checkAuth');


const router = express.Router();

router.get('/', usersController.getAllUsers);

router.get('/:userId', usersController.getUserById);

router.post('/signUp', usersController.signUp);

router.post('/signIn', usersController.signIn);

router.put('/:userId', usersController.updateUser);

router.delete('/:userId', checkAuth, usersController.deleteUser);

module.exports = router;