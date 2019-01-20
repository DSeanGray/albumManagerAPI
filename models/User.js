const Sequelize = require('sequelize');
const db = require('../db');

const User = db.define('users', {
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            isEmail: true
        },
        unique: {
            args: true,
            msg: 'Email address already in use!'
        }
    },
    password: {
        type: Sequelize.STRING,
        notEmpty: false,
    }
},
{
    timestamps: false
});

module.exports = User;