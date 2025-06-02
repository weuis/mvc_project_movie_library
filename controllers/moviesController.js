const { loadMovies, saveMovies } = require('../utils/db');
const { v4: uuid } = require('uuid');

const axios = require('axios');

let movies = loadMovies();

const findMovieById = (id) => movies.find(m => m.id === id);

exports.index = (req, res) => {
    const { sort, query } = req.query;
    const movies = loadMovies();

    let filteredMovies = [...movies];

    if (query) {
        const lowerQuery = query.toLowerCase();
        filteredMovies = filteredMovies.filter(movie =>
            movie.title.toLowerCase().includes(lowerQuery)
        );
    }

    if (sort === 'title') {
        filteredMovies.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sort === 'rating') {
        filteredMovies.sort((a, b) => b.rating - a.rating);
    } else if (sort === 'status') {
        filteredMovies.sort((a, b) => a.status.localeCompare(b.status));
    }

    res.render('movies/index', {
        movies: filteredMovies,
        query,
        success_msg: req.flash('success_msg'),
        error_msg: req.flash('error_msg')
    });
};

exports.addMovieForm = (req, res) => {
    res.render('movies/add');
};

exports.addMovie = async (req, res) => {
    const {title, director, rating, status, review, genre} = req.body;

    const apiKey = '507a05f882da46eac731db6a8ed49519'; // замени на свой ключ
    let poster = '';

    if (!title || !director || !rating || rating < 1 || rating > 10) {
        req.flash('error_msg', 'Wypełnij poprawnie wszystkie pola!');
        return res.redirect('/add');
    }

    try {
        const response = await axios.get('https://api.themoviedb.org/3/search/movie', {
            params: {
                api_key: apiKey,
                query: title,
                language: 'pl-PL',
            }
        });

        const movie = response.data.results[0];
        if (movie && movie.poster_path) {
            poster = `https://image.tmdb.org/t/p/w400${movie.poster_path}`;
        }
    } catch (error) {
        console.error('❌ Błąd pobierania plakatu z TMDb:', error.message);
    }

    const newMovie = {
        id: uuid(),
        title: title.trim(),
        director: director.trim(),
        rating: Math.max(1, Math.min(10, Number(rating))),
        status: status === 'obejrzany' ? 'obejrzany' : 'do obejrzenia',
        review: review.trim(),
        genre: genre ? genre.trim() : 'Nieznany',
        poster
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


