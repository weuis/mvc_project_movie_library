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
