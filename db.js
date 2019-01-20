const connectionString = 'postgres://localhost:5432/album-manager'
const Sequelize = require('sequelize');
const db = new Sequelize(connectionString, {operatorsAliases: false});

module.exports = db