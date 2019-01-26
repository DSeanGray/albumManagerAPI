'use strict';

const User = require('../../../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

class UserController {

    getUserByEmail(email) {
        return User.findOne({
            where: {
                email: email
            }
        });
    }

    addUser(newUser) {
        return User.create(newUser);
    }

    checkUserExists(req, res, next) {
        this.getUserByEmail(req.body.email).then(user => {
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

                this.addUser(newUser)
                    .then(() => {
                        res.status(201).json({
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
        this.getUserByEmail(req.body.email).then(user => {
            if (!user) {
                    this.returnAuthFailed(res);
                } else {
                    const passwordData = {
                        userEnteredPassword: req.body.password,
                        password: user.password
                    };
                    this.attemptAuthentication(passwordData, user, res);
                }
            })
            .catch(err =>
                console.log(err)
            );
    }

    attemptAuthentication(passWordData, user, res) {
        return bcrypt.compare(passWordData.userEnteredPassword, passWordData.password, (err, result) => {
            if (err) {
                this.returnAuthFailed(res);
            }
            if (result) {
                const token = jwt.sign(
                    {email: user.email, userId: user.id},
                    'tokenThatShouldBeHiddenSomewhere',
                    {expiresIn: '1h'}
                );

                return res.status(200).json({
                    message: 'Auth successful.',
                    token: token
                });
            } else {
                this.returnAuthFailed(res);
            }
        });
    }

    returnAuthFailed(res) {
        return res.status(401).json({
            message: 'Auth failed.'
        });
    }

    hashPassword(password, salt) {
        return bcrypt.hash(password, salt);
    }

}

module.exports = UserController;
