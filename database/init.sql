CREATE USER 'user' IDENTIFIED BY '1234';
CREATE DATABASE moviedb;

GRANT ALL PRIVILEGES ON moviedb.* to 'user';

USE moviedb;

CREATE TABLE movie(
    movie_id INT AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    overview VARCHAR(2048),
    runtime INT,
    score FLOAT,
    release_date DATE,
    imagename VARCHAR(255),
    PRIMARY KEY (movie_id)
);

CREATE TABLE actor(
    actor_id INT AUTO_INCREMENT,
    fullname VARCHAR(255) NOT NULL,
    PRIMARY KEY (actor_id)
);

CREATE TABLE genre(
    genre_id INT AUTO_INCREMENT,
    genre VARCHAR(255) NOT NULL,
    PRIMARY KEY (genre_id)
);

CREATE TABLE movie_actor(
    movie_id INT NOT NULL,
    actor_id INT NOT NULL,
    PRIMARY KEY (movie_id, actor_id),
    FOREIGN KEY(movie_id)
        REFERENCES movie(movie_id),
    FOREIGN KEY(actor_id)
        REFERENCES actor(actor_id)
);

CREATE TABLE movie_genre(
    movie_id INT NOT NULL,
    genre_id INT NOT NULL,
    PRIMARY KEY (movie_id, genre_id),
    FOREIGN KEY(movie_id)
        REFERENCES movie(movie_id),
    FOREIGN KEY(genre_id)
        REFERENCES genre(genre_id)
);

LOAD DATA LOCAL INFILE
  '/data/movie.dat' into table movie FIELDS TERMINATED BY '|' IGNORE 1 LINES (@_, title, overview, runtime, score, @date, imagename) SET release_date = STR_TO_DATE(@date, '%Y-%m-%d');

LOAD DATA LOCAL INFILE
  '/data/actor.dat' into table actor FIELDS TERMINATED BY '|' IGNORE 1 LINES (@_, fullname);

LOAD DATA LOCAL INFILE
  '/data/genre.dat' into table genre FIELDS TERMINATED BY '|' IGNORE 1 LINES (@_, genre);

LOAD DATA LOCAL INFILE
  '/data/movie_actor.dat' into table movie_actor FIELDS TERMINATED BY '|' IGNORE 1 LINES (movie_id, actor_id);

LOAD DATA LOCAL INFILE
  '/data/movie_genre.dat' into table movie_genre FIELDS TERMINATED BY '|' IGNORE 1 LINES (movie_id, genre_id);