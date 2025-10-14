const express = require('express');
const router = express.Router();
const UserController = require("../Controller/UserController");

router.get('/', UserController.getAllUsersHandler)
router.get('/:id', UserController.getUserByIdHandler)
router.post('/', UserController.createUserHandler)
router.post('/login', UserController.loginUserHandler)
router.put('/', UserController.updateUserHandler)
router.delete('/:id', UserController.deleteUserHandler)

module.exports = router