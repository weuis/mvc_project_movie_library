let movies = [];

exports.index = (req, res) => {
    res.render('movies/index', { movies });
};

exports.addMovieForm = (req, res) => {
    res.render('movies/add');
};

exports.addMovie = (req, res) => {
    const { title, director, rating } = req.body;
    const newMovie = {
        title,
        director,
        rating,
        status: 'W trakcie',
        review: ''
    };
    movies.push(newMovie);
    res.redirect('/');
};
