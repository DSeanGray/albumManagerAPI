const express = require('express');
const app = express();
const logger = require('morgan');
const db = require('./db');

const recordRoutes = require('./api/routes/albums');
const userRoutes = require('./api/routes/user');

app.use(logger('dev'));

db.authenticate()
    .then(() => console.log('PostgreSQL Database successfuly connected.'))
    .catch(err => console.log(err));

app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use('/albums', recordRoutes);
app.use('/user', userRoutes);

app.use((req, res, next) => {
    const error = new Error('Not Found');
    res.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status = error.status || 500;
    res.json({error: {
        message: error.message
    }})
});

module.exports = app;
