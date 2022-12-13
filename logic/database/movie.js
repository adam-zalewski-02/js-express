import { UnexistingResourceError } from '../exceptions/errorhandling.js';
import { executeWithResult, executeWithoutResult } from './data/connection.js';
import { takeFirst, flatten, getDate } from './utils.js';

const GETALLMOVIESQUERY = "SELECT * FROM `movie` LIMIT ? OFFSET ?";
const GETALLMOVIESWITHGENREQUERY = "SELECT `movie`.* FROM `movie_genre` LEFT JOIN `movie` ON  `movie`.`movie_id` = `movie_genre`.`movie_id` WHERE `movie_genre`.`genre_id` = ? LIMIT ? OFFSET ?";

const SINGLEMOVIEQUERY = "SELECT * FROM `movie` WHERE `movie_id` = ?";
const GETGENRESFORMOVIEQUERY = "SELECT `genre` FROM `movie_genre` LEFT JOIN `genre` ON `movie_genre`.`genre_id` = `genre`.`genre_id` WHERE `movie_genre`.`movie_id` = ?;"
const GETACTORSFORMOVIEQUERY = "SELECT `fullname` FROM `movie_actor` LEFT JOIN `actor` on `movie_actor`.`actor_id` = `actor`.`actor_id` WHERE `movie_actor`.`movie_id` = ?;";

async function buildFullMovieObject(movie) {
    const copy = {...movie};
    copy.genreId = await executeWithResult(GETGENRESFORMOVIEQUERY, movie.movie_id).then(res => flatten(res, "genre"));
    copy.actors = await executeWithResult(GETACTORSFORMOVIEQUERY, movie.movie_id).then(res => flatten(res, "fullname"));
    copy.release_date = getDate(movie.release_date);
    return copy;
}

async function getAllMovies(genreId, offset = 0, limit = 20) {
    let result;
    if (genreId) result = await executeWithResult(GETALLMOVIESWITHGENREQUERY, genreId, limit, offset)
    else result = await executeWithResult(GETALLMOVIESQUERY, limit, offset);
    
    return result;
}

async function getMovieFromId(id) {
    const movie = await executeWithResult(SINGLEMOVIEQUERY, id).then(takeFirst);
    if (movie === undefined) throw new UnexistingResourceError("Invalid Id");
    
    return buildFullMovieObject(movie);
}

export { getAllMovies, getMovieFromId }