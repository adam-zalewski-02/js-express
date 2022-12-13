import express from 'express';
import cors from 'cors';
import { Genre, Movie, Actor } from './logic/data/mock/mock-repository.js';

const PORT = 3000;

const app = express();

app.listen(PORT, () =>
  console.log(`MovieDB listening on ${PORT}`)
);

app.use(cors());

app.use("/", express.static('public'));

app.use((err, req, res, next) => {
  if (err instanceof CustomError) 
      res.status(err.statusCode).send(err.message);
  else {
      console.error(err);
      res.status(500).send("Server error");
  }
});


app.get('/genres', (req, res) => {
  res.json(Genre.getAllGenres());
});

app.get('/movies', (req, res) => {
  const genreid = parseInt(req.query.genre) || undefined;
  res.json(Movie.getAllMovies(genreid));
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

