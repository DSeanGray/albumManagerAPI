const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');
const UserController = require('../controlers/users.contoller');
const userController = new UserController();

router.post('/signup', (req, res, next) => {
    userController.checkUserExists(req, res, next);
    userController.createNewUser(req, res);
});

router.post('/login', (req, res) => {
    User.findOne({
        where: {
            email: req.body.email
        }
    })
    .then(user => {
        if (!user) {
            return res.status(401).json({
                message: 'Auth failed.'
            });
        }
        bcrypt.compare(req.body.password, user.password, (err, result) => {
            if (err) {
                return res.status(401).json({
                    message: 'Auth failed.'
                });
            }
            if (result) {
                const token = jwt.sign({
                    email: user.email,
                    userId: user.id
                },
                'tokenThatShouldBeHiddenSomewhere',
                {
                    expiresIn: '1h'
                });

                return res.status(200).json({
                    message: 'Auth successful.',
                    token: token
                });
            }
            res.status(401).json({
                message: 'Auth failed.'
            });
        })
    })
    .catch(err =>
        console.log(err)
        );
});

module.exports = router;
