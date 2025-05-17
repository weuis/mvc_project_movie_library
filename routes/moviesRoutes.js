const express = require('express');
const router = express.Router();
const moviesController = require('../controllers/moviesController');

// Главная
router.get('/', moviesController.index);

// Добавить фильм
router.get('/add', moviesController.addMovieForm);
router.post('/add', moviesController.addMovie);

// Детали фильма
router.get('/details/:id', moviesController.movieDetails);

// Редактировать
router.get('/edit/:id', moviesController.editMovieForm);
router.post('/edit/:id', moviesController.updateMovie);

// Удалить
router.post('/delete/:id', moviesController.deleteMovie);

module.exports = router;
