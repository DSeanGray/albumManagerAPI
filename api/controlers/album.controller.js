'use strict';

const Album = require('../../models/Album');

class AlbumController {

    getAllAlbums(req, res) {
        Album.findAll()
            .then(albums => res.json(albums))
            .catch(err => console.log(err));
    }

    getAlbumById(req, res) {
        const albumId = req.params.albumId;

        Album.findOne(albumId)
            .then(album => res.json(album))
            .catch(err => console.log(err));
    }

    addAlbum(req, res) {
        const newAlbum = req.body;

        Album.create(newAlbum)
            .then(album => res.json({
                    album,
                    message: 'Album created.'
                }))
            .catch(err => console.log(err.message));
    }

    deleteAlbumById(req, res) {
        const albumId = req.params.albumId;
        const query = {where: {id: albumId}};

        Album.destroy(query)
            .then(() => res.json({
                    message: `Album with id: ${albumId} deleted`
                }))
            .catch(err => console.log(err));
    }
}

module.exports = AlbumController;
