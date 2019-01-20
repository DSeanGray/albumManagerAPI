const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');

router.post('/signup', (req, res, next) => {
    User.findOne({
        where: {
            email: req.body.email
        }
    }).then(user => {
        if (user) {
            res.json({
                message: 'User Already Exists'
            })
        }
        else {
            next();
        }
    })}, function (req, res) {
    createUser(req.body);
    res.json({message: 'User created.'});
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

function createUser(userData) {
    bcrypt.hash(userData.password, 10)
    .then((hash) => {
        const email = userData.email;
        const newUser = {email, password: hash}

        User.create(newUser)
        .then(user => {
            const response = {
                user,
                message: `User created for ${email}`
            };

            return response;
        })
        .catch(err => 
            console.log(err)
            )
        });
};

module.exports = router;