'use strict';

const Sequelize = require('sequelize');
const db = require('../db');

const Album = db.define('album', {
    artist: {
        type: Sequelize.STRING,
        notEmpty: false,
        allowNull: false
    },
    title: {
        type: Sequelize.STRING,
        notEmpty: false,
        allowNull: false,
    },
    year: {
        type: Sequelize.STRING,
        notEmpty: false,
        allowNull: false
    },
    label: {
        type: Sequelize.STRING,
        notEmpty: false,
        allowNull: false
    },
},
{
    timestamps: false
});

module.exports = Album;
