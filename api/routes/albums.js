const express = require('express');
const router = express.Router();
const Album = require('../../models/Album');

router.get('/', (req, res) => {
    try {
        Album.findAll()
        .then(albums =>
            res.json(albums));
    }
    catch(err) {
        (err => console.log(err));
    };
});

router.get('/:albumId', (req, res) => {
    const albumId = req.params.albumId;

    try {
        Album.findOne(albumId)
        .then(album =>
            res.json(album));
    }
    catch(err) {
        err => console.log(err)
    };
});

router.post('/', (req, res) => {
    const newAlbum = req.body;

    try {
        Album.create(newAlbum)
        .then(album =>
            res.json({
                album,
                message: 'Album insterted'
            }));
    }
    catch(err) {
        err => console.log(err)
    }
    
});

router.delete('/:albumId', (req, res, next) => {
    const albumId = req.params.albumId;

    try {
        Album.destroy({
            where: {
                id: albumId
            }
        })
        .then(() =>
            res.json({
                message: `Album ${albumId} Deleted`
            }))
    }
    catch(err) {
        err => console.log(err)
    };
});

module.exports = router;