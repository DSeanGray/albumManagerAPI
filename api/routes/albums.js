'use strict';

const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/auth');
const AlbumController = require('../controlers/album.controller');
const albumComponent = new AlbumController();

router.get('/',
    checkAuth,
    albumComponent.getAllAlbums.bind(albumComponent)
);
router.get('/:userId',
    checkAuth,
    albumComponent.getAlbumByUserId.bind(albumComponent)
);
router.post('/',
    checkAuth,
    albumComponent.addAlbum.bind(albumComponent)
);
router.delete('/:albumId',
    checkAuth,
    albumComponent.deleteAlbumById.bind(albumComponent)
);

module.exports = router;
