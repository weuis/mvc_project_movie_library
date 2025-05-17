const express = require('express');
const router = express.Router();
const moviesController = require('../controllers/moviesController');

router.get('/', moviesController.index);

router.get('/add', moviesController.addMovieForm);
router.post('/add', moviesController.addMovie);

module.exports = router;
