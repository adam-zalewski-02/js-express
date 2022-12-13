import { BodyParsingError, UnexistingResourceError } from '../../exceptions/errorhandling.js';
import { actors, movie_actors } from './data/mockdata.js';

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

function create(data) {
    const id = actors.reduce((acc, cur) => Math.max(parseInt(cur.actor_id), acc), 0) + 1;
    const { fullname } = data;
    if (fullname === undefined) {
        throw new BodyParsingError("Body must contain a name");
    }
    const newactor = {actor_id: id, fullname: fullname};
    actors.push(newactor);
}

function update(id, data) {
    if (data === undefined) {
        throw new BodyParsingError("Body cannot be empty");
    }
    const actor = getActorFromId(id);

    const { fullname } = data;
    if (fullname === undefined) {
        throw new BodyParsingError("Body must contain a name");
    }
    actor.fullname = data.fullname
}

function remove(id) {
    const index = actors.findIndex(actor => actor.actor_id === id);
    if (index === -1) {
        throw new UnexistingResourceError("Invalid id");
    }
    actors.splice(index, 1);

    for (let i = movie_actors.length - 1; i >= 0; i--) {
        if (movie_actors[i].actor_id === id) {
            movie_actors.splice(i, 1);
        }
    }
}

export { getAllActors, getActorFromId, create, update, remove }