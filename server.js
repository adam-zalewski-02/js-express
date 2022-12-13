import express from 'express';
import cors from 'cors';
import { Genre } from './logic/data/mock/mock-repository.js';

const PORT = 3000;

const app = express();

app.listen(PORT, () =>
  console.log(`MovieDB listening on ${PORT}`)
);

app.use(cors());

app.get('/genres', (req, res) => {
  res.json(Genre.getAllGenres());
});

