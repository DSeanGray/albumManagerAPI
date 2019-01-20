const express = require('express');
const router = express.Router();
const Album = require('../../models/Album');

router.get('/', (req, res) => {
    Album.findAll()
    .then(albums =>
        res.json(albums))
        .catch(err => 
            console.log(err));
});

router.get('/:albumId', (req, res) => {
    const albumId = req.params.albumId;

    Album.findOne(albumId)
    .then(album =>
        res.json(album))
        .catch(err => 
            console.log(err));
});

router.post('/', (req, res) => {
    const newAlbum = req.body;

    Album.create(newAlbum)
        .then(album =>
            res.json({
                album,
                message: 'Album insterted'
            }))
            .catch(err => 
                console.log(err.message)
)});

router.delete('/:albumId', (req, res, next) => {
    const albumId = req.params.albumId;

    Album.destroy({
        where: {
            id: albumId
        }
    })
    .then(() =>
        res.json({
            message: `Album ${albumId} Deleted`
        })).catch(err => 
            console.log(err))
});

module.exports = router;