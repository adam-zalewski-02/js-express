import express from 'express';
import cors from 'cors';

const GENRES = [{genre_id: 1, genre: 'Action'}, {genre_id: 2, genre: 'Adventure'}, {genre_id: 3, genre: 'Fantasy'}, {genre_id: 4, genre: 'Science Fiction'}, {genre_id: 5, genre: 'Crime'}, {genre_id: 6, genre: 'Drama'}, {genre_id: 7, genre: 'Thriller'}, {genre_id: 8, genre: 'Animation'}, {genre_id: 9, genre: 'Family'}, {genre_id: 10, genre: 'Western'}, {genre_id: 11, genre: 'Comedy'}, {genre_id: 12, genre: 'Romance'}, {genre_id: 13, genre: 'Horror'}, {genre_id: 14, genre: 'Mystery'}, {genre_id: 15, genre: 'History'}, {genre_id: 16, genre: 'War'}, {genre_id: 17, genre: 'Music'}, {genre_id: 18, genre: 'Documentary'}, {genre_id: 19, genre: 'Foreign'}, {genre_id: 20, genre: 'TV Movie'}];

const PORT = 3000;

const app = express();

app.listen(PORT, () =>
  console.log(`MovieDB listening on ${PORT}`)
);

app.use(cors());

app.get('/genres', (req, res) => {
  res.json(GENRES);
});

