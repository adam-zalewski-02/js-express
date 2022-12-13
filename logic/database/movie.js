import { executeWithResult, executeWithoutResult } from './data/connection.js';

const GETALLMOVIESQUERY = "SELECT * FROM `movie` LIMIT ? OFFSET ?";
const GETALLMOVIESWITHGENREQUERY = "SELECT `movie`.* FROM `movie_genre` LEFT JOIN `movie` ON  `movie`.`movie_id` = `movie_genre`.`movie_id` WHERE `movie_genre`.`genre_id` = ? LIMIT ? OFFSET ?";


async function getAllMovies(genreId, offset = 0, limit = 20) {
    let result;
    if (genreId) result = await executeWithResult(GETALLMOVIESWITHGENREQUERY, genreId, limit, offset)
    else result = await executeWithResult(GETALLMOVIESQUERY, limit, offset);
    
    return result;
}

export { getAllMovies }