'use strict';

const DB_ENV = {
    dev: {
        DBString: 'postgres://localhost:5432/album-manager'
    },
    test: {
        DBString: 'postgres://localhost:5432/test-album-manager'
    }
};
const connectionString = DB_ENV[process.env.APP_ENV].DBString;
const Sequelize = require('sequelize');
const db = new Sequelize(connectionString, {operatorsAliases: false});

module.exports = db;
