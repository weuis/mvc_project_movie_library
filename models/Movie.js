const { v4: uuidv4 } = require('uuid'); // Do generowania unikalnych ID

class Movie {
    static Status = {
        WATCHED: 'Obejrzany',
        TO_WATCH: 'Do obejrzenia',
    };

    constructor({ title, director, rating = 0, status = Movie.Status.TO_WATCH, review = '' }) {
        this.id = uuidv4();
        this.title = title.trim();
        this.director = director.trim();
        this.rating = this.validateRating(rating);
        this.status = this.validateStatus(status);
        this.review = review.trim();
        this.createdAt = new Date();
    }

    validateRating(rating) {
        const parsed = parseFloat(rating);
        if (isNaN(parsed) || parsed < 0 || parsed > 10) {
            return 0;
        }
        return parsed;
    }

    validateStatus(status) {
        return Object.values(Movie.Status).includes(status)
            ? status
            : Movie.Status.TO_WATCH;
    }

    isWatched() {
        return this.status === Movie.Status.WATCHED;
    }

    shortInfo() {
        return `${this.title} (${this.director}) – ${this.rating}/10`;
    }
}

module.exports = Movie;
