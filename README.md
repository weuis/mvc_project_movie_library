# Biblioteka Filmów

## Autor: [Rozehan Oleksii 55666]

## Projekt zrealizowany w ramach przedmioty: Wzorzec MVC w tworzeniu aplikacji internetowych  – [University VIZJA]

## 🎬 Opis projektu

Aplikacja "Biblioteka Filmów" to system zarządzania kolekcją filmów, który umożliwia użytkownikowi dodawanie, przeglądanie, edytowanie i usuwanie informacji o filmach. Projekt został stworzony w celu nauki architektury MVC oraz renderowania po stronie serwera (SSR) z wykorzystaniem Node.js.

Aplikacja będzie dostępna pod adresem: http://localhost:3000

## Funkcjonalności

- ➕ Dodawanie nowych filmów do biblioteki
- 📝 Edytowanie istniejących wpisów
- 🗑️ Usuwanie filmów z listy
- 🔍 Przeglądanie listy wszystkich filmów
- 🔎 Filtrowanie i wyszukiwanie filmów po tytule lub gatunku
- 🎨 Estetyczny i przejrzysty interfejs użytkownika (SSR)

## 📦 Wykorzystane biblioteki zewnętrzne
[express](https://www.npmjs.com/package/express) – obsługa serwera HTTP i routing

[ejs](https://www.npmjs.com/package/ejs) – silnik szablonów do SSR

[body-parser](https://www.npmjs.com/package/body-parser) – przetwarzanie danych z formularzy

[uuid](https://www.npmjs.com/package/uuid) – generowanie unikalnych identyfikatorów

## 💾 Przykładowe dane wejściowe
Przykład wpisu w pliku data/movies.json:

{  
"id": "1a2b3c",  
"title": "Incepcja",  
"genre": "Science Fiction",  
"year": 2010,  
"rating": 9.0  
}  
Możesz dodawać dane poprzez formularz w aplikacji lub bezpośrednio w pliku JSON.

## 🖼️ Zrzuty ekranu aplikacji 
📄 Strona główna z listą filmów
![Lista filmów](./screenshots/main.png)

## 🛠️ Instrukcja uruchomienia

**Wymagania:**
- Node.js w wersji **16.x** lub wyższej
- npm (Node Package Manager)

### 🔧 Instalacja projektu

```bash
git clone https://github.com/twoja-nazwa-uzytkownika/mvc_project_movie_library.git
cd mvc_project_movie_library

npm install

node library_main_app.js
