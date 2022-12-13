import { executeWithResult } from './data/connection.js';

const GETALLGENRESQUERY = 'SELECT * FROM genre;'; 

async function getAllGenres() {
    return executeWithResult(GETALLGENRESQUERY);
}

export { getAllGenres };