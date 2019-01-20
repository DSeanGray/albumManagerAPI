const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../../models/User');

router.post('/signup', (req, res) => {
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
            createUser(req.body);
            res.json({message: 'User created.'});
        }
    })
    
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
        }).catch(err => console.log(err))});
};

module.exports = router;