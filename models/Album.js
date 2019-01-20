const Sequelize = require('sequelize');
const db = require('../db');

const Album = db.define('album', {
    title: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
    },
    songs: {
        type: Sequelize.ABSTRACT,
        notEmpty: false,
        allowNull: false
    }
},
{
    timestamps: false
});

module.exports = Album;