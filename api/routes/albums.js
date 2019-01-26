'use strict';

const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/auth');
const AlbumController = require('../controlers/album.controller');
const albumComponent = new AlbumController();

router.get('/', checkAuth, (req, res) => albumComponent.getAllAlbums(req, res));
router.get('/:albumId', checkAuth, (req, res) => albumComponent.getAlbumById(req, res));
router.post('/', checkAuth, (req, res) => albumComponent.addAlbum(req, res));
router.delete('/:albumId', checkAuth, (req, res) => albumComponent.deleteAlbumById(req, res));

module.exports = router;
