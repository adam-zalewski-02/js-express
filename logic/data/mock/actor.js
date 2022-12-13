import { UnexistingResourceError } from '../../exceptions/errorhandling.js';
import { actors } from './data/mockdata.js';

function getAllActors() {
    return actors;
}

function getActorFromId(id) {
    const actor = actors.find(actor => actor.actor_id === id);
    if (actor === undefined) {
        throw new UnexistingResourceError("Invalid id");
    }
    return actor;
}

export { getAllActors, getActorFromId }