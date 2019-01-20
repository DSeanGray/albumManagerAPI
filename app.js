const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');

const recordRoutes = require('./api/routes/records');

app.use(morgan('dev'));
app.use(bodyParser).urlencoded({extended: false});
app.use(bodyParser.json);

app.use('/records', recordRoutes);

app.use((req, res, next) => {
    const error = new Error('Not Found');
    res.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({error: {
        message: error.message
    }})
});

module.exports = app;
