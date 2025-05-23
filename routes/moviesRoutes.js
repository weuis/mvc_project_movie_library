const express = require('express');
const router = express.Router();
const moviesController = require('../controllers/moviesController');

router.get('/', moviesController.index);

router.get('/add', moviesController.addMovieForm);
router.post('/add', moviesController.addMovie);

router.get('/details/:id', moviesController.movieDetails);

router.get('/edit/:id', moviesController.editMovieForm);
router.post('/edit/:id', moviesController.updateMovie);

router.post('/delete/:id', moviesController.deleteMovie);

router.get('/top_movies', moviesController.topRated);


module.exports = router;
