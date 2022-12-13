import { UnexistingResourceError } from '../exceptions/errorhandling.js';
import { executeWithoutResult, executeWithResult } from './data/connection.js';
import { flatten, getDate, takeFirst } from './utils.js';

const GETALLACTORSQUERY = "SELECT * FROM `actor`;";
const SINGLEACTORSQUERY = "SELECT * from `actor` WHERE `actor_id` = ?;";

async function getAllActors() {
    return executeWithResult(GETALLACTORSQUERY);
}

async function getActorFromId(id) {
    const actor = await executeWithResult(SINGLEACTORSQUERY, id).then(takeFirst);
    if (actor === undefined) throw new UnexistingResourceError("Invalid id");
    return actor;
}

export { getAllActors, getActorFromId };