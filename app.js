'use strict';

process.env.APP_ENV = 'dev';
const express = require('express');
const app = express();
const cors = require('cors');
const logger = require('morgan');
const db = require('./db');

const recordRoutes = require('./api/routes/albums');
const userRoutes = require('./api/routes/user');

app.use(logger('dev'));

db.authenticate()
    .then(() => console.log('PostgreSQL Database successfully connected.'))
    .catch(err => console.log(err));

app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

app.use('/albums', recordRoutes);
app.use('/user', userRoutes);

app.use((req, res, next) => {
    const error = new Error('Not Found');

    res.status = 404;
    next(error);
});

app.use((error, req, res) => {
    res.status(error.status || 500);
    res.json({error: {
        message: error.message
    }})
});

module.exports = app;
