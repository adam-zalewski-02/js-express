import { UnexistingResourceError } from '../exceptions/errorhandling.js';
import { executeWithoutResult, executeWithResult } from './data/connection.js';
import { flatten, getDate, takeFirst } from './utils.js';

const GETALLACTORSQUERY = "SELECT * FROM `actor`;";
const SINGLEACTORSQUERY = "SELECT * from `actor` WHERE `actor_id` = ?;";
const CREATEACTORQUERY = "INSERT INTO `actor` (`fullname`) VALUES (?);"
const UPDATEACTORQUERY = "UPDATE `actor` SET fullname = ? WHERE `actor_id` = ?;"
const DELETEACTORQUERY = "DELETE FROM `actor` WHERE `actor_id` = ?;"
const DELETEACTORFROMMOVIESQUERY = "DELETE FROM `movie_actor` WHERE `actor_id` = ?;"



async function getAllActors() {
    return executeWithResult(GETALLACTORSQUERY);
}

async function getActorFromId(id) {
    const actor = await executeWithResult(SINGLEACTORSQUERY, id).then(takeFirst);
    if (actor === undefined) throw new UnexistingResourceError("Invalid id");
    return actor;
}

async function create(data) {
    if (data === undefined) 
        throw new BodyParsingError("Body cannot be empty");

    const { fullname } = data;
    if (fullname === undefined) 
        throw new BodyParsingError("Body must contain a name");

    await executeWithoutResult(CREATEACTORQUERY, fullname);
}

async function update(id, data) {
    if (data === undefined) 
        throw new BodyParsingError("Body cannot be empty");

    const { fullname } = data;
    if (fullname === undefined) 
        throw new BodyParsingError("Body must contain a name");

    const affected = await executeWithoutResult(UPDATEACTORQUERY, fullname, id);
    if (affected === 0) throw new UnexistingResourceError("Invalid id");
}

async function remove(id) {
    await executeWithoutResult(DELETEACTORFROMMOVIESQUERY, id);
    const affected = await executeWithoutResult(DELETEACTORQUERY, id);

    if (affected === 0) throw new UnexistingResourceError("Invalid id");
}



export { getAllActors, getActorFromId, create, update, remove };