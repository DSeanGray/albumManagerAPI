const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'GET from albums'
    })
});

router.get('/:albumId', (req, res, next) => {
    const id = req.params.albumId;
    res.status(200).json({
        message: 'GET from albums',
        albumId: id
    })
});

router.post('/', (req, res, next) => {
    const record = {
        name: req.body.name
    }
    res.status(201).json({
        message: 'POST to /albums'
    })
});

router.patch('/:albumId', (req, res, next) => {
    res.status(200).json({
        message: 'PATCH to /albums'
    })
});

router.delete('/:albumId', (req, res, next) => {
    
    res.status(200).json({
        message: 'DELETE from /albums'
    })
});

module.exports = router;