const express = require('express');
const app = express();
const bodyParser = require()

app.use((req, res, next) => {
    res.status(200).json({
        message: 'Server is running on port 3000'
    })
});
