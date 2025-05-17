const { loadMovies, saveMovies } = require('../utils/db');

let movies = loadMovies();

exports.index = (req, res) => {
    res.render('movies/index', { movies });
};

exports.addMovieForm = (req, res) => {
    res.render('movies/add');
};

exports.addMovie = (req, res) => {
    const { title, director, rating, status, review } = req.body;

    const newMovie = {
        title,
        director,
        rating,
        status,
        review
    };

    movies.push(newMovie);
    saveMovies(movies);
    res.redirect('/');
};
exports.movieDetails = (req, res) => {
    const movie = movies[req.params.id];
    if (!movie) return res.status(404).send('Film nie znaleziony.');
    res.render('movies/details', { movie, id: req.params.id });
};

// Форма редактирования
exports.editMovieForm = (req, res) => {
    const movie = movies[req.params.id];
    if (!movie) return res.status(404).send('Film nie znaleziony.');
    res.render('movies/edit', { movie, id: req.params.id });
};

// Обновить фильм
exports.updateMovie = (req, res) => {
    const { title, director, rating, status, review } = req.body;
    const id = req.params.id;
    movies[id] = { title, director, rating, status, review };
    saveMovies(movies);
    res.redirect('/');
};

// Удалить фильм
exports.deleteMovie = (req, res) => {
    const id = req.params.id;
    movies.splice(id, 1);
    saveMovies(movies);
    res.redirect('/');
};
