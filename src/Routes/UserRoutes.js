const express = require('express');
const router = express.Router();
const UserController = require("../Controller/UserController");

router.get('/', UserController.getAllUsersHandler)
router.get('/:id', UserController.getUserByIdHandler)
router.put('/:id', UserController.updateUserHandler)
router.delete('/:id', UserController.deleteUserHandler)


router.post('/', UserController.createUserHandler)
router.post('/login', UserController.loginUserHandler)

module.exports = router