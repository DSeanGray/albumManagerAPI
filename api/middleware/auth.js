'use strict';

const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const verifiedToken = jwt.verify(token, 'tokenThatShouldBeHiddenSomewhere');

        req.authToken = verifiedToken;

        next();
    } catch (error) {
        console.log('here -----------');
        return res.status(401).json({
            message: 'Auth failed.'
        });
    }
};
