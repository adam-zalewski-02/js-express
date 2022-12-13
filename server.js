import express from 'express';
import cors from 'cors';
import basicAuth from 'express-basic-auth';
import { Genre, Movie, Actor } from './logic/database/database-repository.js'; 
//import { Actor } from './logic/data/mock/mock-repository.js';
import { CustomError } from './logic/exceptions/errorhandling.js';

const PORT = 3000;
const SUCCESFULL_ADD = 201;
const SUCCESFULL_UPDATE = 204;
const SUCCESFULL_DELETE = 204;
const ADMIN_USERS = {admin: '1234'};
const ITEMSPERPAGE = 20;

const app = express();

app.listen(PORT, () =>
  console.log(`MovieDB listening on ${PORT}`)
);

app.use(cors());

app.use("/", express.static('public'));

app.use(express.json());


app.use((err, req, res, next) => {
  if (err instanceof CustomError) 
      res.status(err.statusCode).send(err.message);
  else {
      console.error(err);
      res.status(500).send("Server error");
  }
});


app.get('/genres', (req, res, next) => {
  Genre.getAllGenres()
      .then(results => res.json(results))
      .catch(err => next(err));
});

app.get('/movies', (req, res, next) => {
  const genreId = parseInt(req.query.genre) || 0;
  let page = parseInt(req.query.genre) || 0;
  page = Math.max(1, page);

  Movie.getAllMovies(genreId, (page - 1) * ITEMSPERPAGE, ITEMSPERPAGE)
      .then(results => res.json(results))
      .catch(err => next(err));
});

app.get('/movies/:id', (req, res) => {
  const id = parseInt(req.params.id);
  res.json(Movie.getMovieFromId(id));
});

app.get('/actors', (req, res) => {
  res.json(Actor.getAllActors());
});

app.get('/actors/:id', (req, res) => {
  const id = parseInt(req.params.id);
  res.json(Actor.getActorFromId(id));
});

app.post('/actors', basicAuth({users: ADMIN_USERS}), (req, res) => {
  Actor.create(req.body);
  res.status(SUCCESFULL_ADD).send();
});

app.put('/actors/:id', basicAuth({users: ADMIN_USERS}), (req, res) => {
  const id = parseInt(req.params.id);
  Actor.update(id, req.body);
    res.status(SUCCESFULL_UPDATE).send();
});

app.delete('/actors/:id', basicAuth({users: ADMIN_USERS}), (req, res) => {
  const id = parseInt(req.params.id);
  Actor.remove(id);
  res.status(SUCCESFULL_DELETE).send();
});



