const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../data/sample.json');

function loadMovies() {
    try {
        const data = fs.readFileSync(filePath, 'utf-8');
        return JSON.parse(data) || [];
    } catch (err) {
        console.error('❌ Błąd wczytywania pliku JSON:', err.message);
        return [];
    }
}

function saveMovies(movies) {
    try {
        fs.writeFileSync(filePath, JSON.stringify(movies, null, 2), 'utf-8');
        console.log('✅ Dane zapisane pomyślnie.');
    } catch (err) {
        console.error('❌ Błąd zapisu do pliku JSON:', err.message);
    }
}

module.exports = {
    loadMovies,
    saveMovies
};
