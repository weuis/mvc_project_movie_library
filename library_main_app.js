const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

const moviesRoutes = require('./routes/moviesRoutes');

const session = require('express-session');
const flash = require('connect-flash');


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(session({
    secret: 'tajnehaslo',
    resave: false,
    saveUninitialized: true
}));

app.use(flash());

app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    next();
});

app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', moviesRoutes);

app.use((req, res) => {
    res.status(404).render('404', { url: req.originalUrl });
});

app.listen(PORT, () => {
    console.log(`🚀 Serwer działa na http://localhost:${PORT}`);
});
