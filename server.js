import express from 'express';
import cors from 'cors';
import { Genre, Movie } from './logic/data/mock/mock-repository.js';

const PORT = 3000;

const app = express();

app.listen(PORT, () =>
  console.log(`MovieDB listening on ${PORT}`)
);

app.use(cors());

app.use("/", express.static('public'));

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

