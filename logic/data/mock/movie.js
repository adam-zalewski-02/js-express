import { actors, genres, movies, movie_actors, movie_genres } from './data/mockdata.js';

function getAllMovies(genreId) {
    let result = movies;
    if (genreId) 
        result = result.filter(movie => hasGenre(movie.movie_id, genreId));
    return result;
}

function hasGenre(movieId, genreId) {
    return movie_genres.filter(element => element.genre_id === genreId && element.movie_id === movieId).length !== 0
}

function getMovieFromId(id) {
    const movie = movies.find(movie => movie.movie_id === id);
    return extendMovie(movie);
}

function extendMovie(movie) {
    const copy = {...movie};
    copy.genres = movie_genres.filter(entry => entry.movie_id === movie.movie_id)
        .map(entry => genres.find(genre => genre.genre_id === genre.genre_id).genre);
    
    copy.actors = movie_actors.filter(entry => entry.movie_id === movie.movie_id)
        .map(entry => actors.find(actor => entry.actor_id === actor.actor_id).fullname);
    return copy;
}

export { getAllMovies, getMovieFromId };