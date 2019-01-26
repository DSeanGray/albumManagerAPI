'use strict';

const express = require('express');
const router = express.Router();
const UserController = require('../controlers/users.contoller');
const userController = new UserController();

router.post('/signup',
    userController.checkUserExists.bind(userController),
    userController.createNewUser.bind(userController)
);

router.post('/login',
    userController.login.bind(userController)
);

module.exports = router;
