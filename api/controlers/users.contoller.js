'use strict';

const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

class UserController {

    checkUserExists(req, res, next) {
        User.findOne({
            where: {
                email: req.body.email
            }
        }).then(user => {
            if (user) {
                res.status(500).json({
                    message: 'User Already Exists'
                })
            }
            else {
                next();
            }
        })
    }

    createNewUser(req, res) {
        this.hashPassword(req.body.password, 10)
            .then((hash) => {
                const email = req.body.email;
                const newUser = {email, password: hash};

                User.create(newUser)
                    .then(newUser => {
                        res.status(201).json({
                            newUser,
                            message: `User created for ${email}`
                        });
                    })
                    .catch(err => {
                        res.status(500).json( {
                            error: err
                        })
                    });
            });
    };

    login(req, res) {
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
    }

    hashPassword(password, salt) {
        return bcrypt.hash(password, salt);
    }

}

module.exports = UserController;
