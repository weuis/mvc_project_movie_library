const { loadMovies, saveMovies } = require('../utils/db');
const { v4: uuid } = require('uuid');

let movies = loadMovies();

const findMovieById = (id) => movies.find(m => m.id === id);

exports.index = (req, res) => {
    const sort = req.query.sort;
    const movies = loadMovies();

    let sortedMovies = [...movies];

    if (sort === 'title') {
        sortedMovies.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sort === 'rating') {
        sortedMovies.sort((a, b) => b.rating - a.rating);
    } else if (sort === 'status') {
        sortedMovies.sort((a, b) => a.status.localeCompare(b.status));
    }

    res.render('movies/index', { movies: sortedMovies });
};

exports.addMovieForm = (req, res) => {
    res.render('movies/add');
};

exports.addMovie = (req, res) => {
    const { title, director, rating, status, review, genre } = req.body;

    if (!title || !director || !rating || rating < 1 || rating > 10) {
        req.flash('error_msg', 'Wypełnij poprawnie wszystkie pola!');
        return res.redirect('/add');
    }

    const newMovie = {
        id: uuid(),
        title: title.trim(),
        director: director.trim(),
        rating: Math.max(1, Math.min(10, Number(rating))),
        status: status === 'obejrzany' ? 'obejrzany' : 'do obejrzenia',
        review: review.trim(),
        genre: genre ? genre.trim() : 'Nieznany',
    };

    movies.push(newMovie);
    saveMovies(movies);

    req.flash('success_msg', 'Film dodany pomyślnie!');
    res.redirect('/');
};

exports.movieDetails = (req, res) => {
    const movie = findMovieById(req.params.id);
    if (!movie) return res.status(404).send('Film nie znaleziony.');
    res.render('movies/details', { movie });
};

exports.editMovieForm = (req, res) => {
    const movie = findMovieById(req.params.id);
    if (!movie) return res.status(404).send('Film nie znaleziony.');
    res.render('movies/edit', { movie });
};

exports.updateMovie = (req, res) => {
    const { title, director, rating, status, review, genre } = req.body;
    const movie = findMovieById(req.params.id);

    if (!movie) return res.status(404).send('Film nie znaleziony.');

    movie.title = title.trim();
    movie.director = director.trim();
    movie.rating = Math.max(1, Math.min(10, Number(rating)));
    movie.status = status === 'obejrzany' ? 'obejrzany' : 'do obejrzenia';
    movie.review = review.trim();
    movie.genre = genre ? genre.trim() : 'Nieznany';

    saveMovies(movies);
    req.flash('success_msg', 'Film zaktualizowany pomyślnie!');
    res.redirect('/');
};

exports.deleteMovie = (req, res) => {
    movies = movies.filter(m => m.id !== req.params.id);
    saveMovies(movies);
    res.redirect('/');
};

exports.topRated = (req, res) => {
    const topMovies = movies.filter(movie => Number(movie.rating) > 8);
    res.render('movies/top_movies', { movies: topMovies });
};


