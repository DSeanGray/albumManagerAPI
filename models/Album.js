const Sequelize = require('sequelize');
const db = require('../db');

const Album = db.define('album', {
    title: {
        type: Sequelize.STRING
    }
});

module.exports = Album;