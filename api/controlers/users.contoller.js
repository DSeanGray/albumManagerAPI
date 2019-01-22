'use strict';
const User = require('../../models/User');
const bcrypt = require('bcrypt');

class UserController {

    createNewUser(req, res) {
        this.hashPassword(req.body.password, 10)
            .then((hash) => {
            const email = req.body.email;
            const newUser = {email, password: hash};

            User.create(newUser)
                .then(user => {
                    return {
                        user,
                        message: `User created for ${email}`
                    };
                })
                .catch(err => {
                    console.log(err);
                    res.json({message: 'User created.'})
                })
            });
    };

    checkUserExists(req, res, next) {
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
        })
    }

    hashPassword(password, salt) {
        return bcrypt.hash(password, salt);
    }
}

module.exports = UserController;
