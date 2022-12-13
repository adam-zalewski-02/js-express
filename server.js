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
  res.json(Movie.getAllMovies());
});

