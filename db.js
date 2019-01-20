const pg = require('pg');
const connectionString = 'postgres://localhost:5432/album-manager'
const db = new pg.Client(connectionString);

module.exports = db