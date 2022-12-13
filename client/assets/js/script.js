const GENRES = [{genre_id: 1, genre: 'Action'}, {genre_id: 2, genre: 'Adventure'}, {genre_id: 3, genre: 'Fantasy'}, {genre_id: 4, genre: 'Science Fiction'}, {genre_id: 5, genre: 'Crime'}, {genre_id: 6, genre: 'Drama'}, {genre_id: 7, genre: 'Thriller'}, {genre_id: 8, genre: 'Animation'}, {genre_id: 9, genre: 'Family'}, {genre_id: 10, genre: 'Western'}, {genre_id: 11, genre: 'Comedy'}, {genre_id: 12, genre: 'Romance'}, {genre_id: 13, genre: 'Horror'}, {genre_id: 14, genre: 'Mystery'}, {genre_id: 15, genre: 'History'}, {genre_id: 16, genre: 'War'}, {genre_id: 17, genre: 'Music'}, {genre_id: 18, genre: 'Documentary'}, {genre_id: 19, genre: 'Foreign'}, {genre_id: 20, genre: 'TV Movie'}];
const MOVIES = [{'movie_id': 1, 'title': 'Avatar', 'overview': 'In the 22nd century, a paraplegic Marine is dispatched to the moon Pandora on a unique mission, but becomes torn between following orders and protecting an alien civilization.', 'runtime': 162, 'score': '7.2', 'release_date': '2009-12-10', 'imagename': 'MNE1kvzJ0UAFR3CMMzTQWbyRfe3.jpg'}, {'movie_id': 2, 'title': "Pirates of the Caribbean: At World's End", 'overview': 'Captain Barbossa, long believed to be dead, has come back to life and is headed to the edge of the Earth with Will Turner and Elizabeth Swann. But nothing is quite as it seems.', 'runtime': 169, 'score': '6.9', 'release_date': '2007-05-19', 'imagename': 'rAN1bRIOdy5lseZgBiaTMv9gpj7.jpg'}];
const MOVIE_DETAILS = [
    {"movie_id": 1, "title":"Avatar", "overview":"In the 22nd century, a paraplegic Marine is dispatched to the moon Pandora on a unique mission, but becomes torn between following orders and protecting an alien civilization.","runtime":162,"score":7.2,"release_date":"Thu Dec 10 2009","imagename":"MNE1kvzJ0UAFR3CMMzTQWbyRfe3.jpg","genres":["Action","Adventure","Fantasy","Science Fiction"],"actors":["Zoe Saldana","Sigourney Weaver","Stephen Lang","Michelle Rodriguez","Giovanni Ribisi","Joel David Moore","CCH Pounder","Wes Studi","Laz Alonso","Dileep Rao","Matt Gerald","Sean Anthony Moran","Jason Whyte","Scott Lawrence","Kelly Kilgour","James Patrick Pitt","Sean Patrick Murphy","Peter Dillon","Kevin Dorman","Kelson Henderson","David Van Horn","Jacob Tomuri","Michael Blain-Rozgay","Jon Curry","Luke Hawker","Woody Schultz","Peter Mensah","Sonia Yee","Jahnel Curfman","Ilram Choi","Kyla Warren","Lisa Roumain","Debra Wilson","Chris Mala","Taylor Kibby","Jodie Landau","Julie Lamm","Cullen B. Madden","Joseph Brady Madden","Frankie Torres","Austin Wilson","Sara Wilson","Tamica Washington-Miller","Lucy Briant","Nathan Meister","Gerry Blair","Matthew Chamberlain","Paul Yates","Wray Wilson","James Gaylyn","Melvin Leno Clark III","Carvon Futrell","Brandon Jelkes","Micah Moch","Hanniyah Muhammad","Christopher Nolen","Christa Oliver","April Marie Thomas","Bravita A. Threatt","Colin Bleasdale","Mike Bodnar","Matt Clayton","Nicole Dionne","Jamie Harrison","Allan Henry","Anthony Ingruber","Ashley Jeffery","Dean Knowsley","Joseph Mika-Hunt","Terry Notary","Kai Pantano","Logan Pithyou","Stuart Pollock","Raja","Gareth Ruck","Rhian Sheehan","T. J. Storm","Jodie Taylor","Alicia Vela-Bailey","Richard Whiteside","Nikie Zambo","Julene Renee"]},
    {"movie_id": 2, "title":"Pirates of the Caribbean: At World's End", "overview":"Captain Barbossa, long believed to be dead, has come back to life and is headed to the edge of the Earth with Will Turner and Elizabeth Swann. But nothing is quite as it seems.","runtime":169,"score":6.9,"release_date":"Sat May 19 2007","imagename":"rAN1bRIOdy5lseZgBiaTMv9gpj7.jpg","genres":["Action","Adventure","Fantasy"],"actors":["Johnny Depp","Orlando Bloom","Keira Knightley","Stellan Skarsgård","Chow Yun-fat","Bill Nighy","Geoffrey Rush","Jack Davenport","Kevin McNally","Tom Hollander","Naomie Harris","Jonathan Pryce","Keith Richards","Lee Arenberg","Mackenzie Crook","Greg Ellis","David Bailie","Martin Klebba","David Schofield","Lauren Maher","Vanessa Branch","Angus Barnett","Giles New","Reggie Lee","Dominic Scott Kay","Takayo Fischer","David Meunier","Ho-Kwan Tse","Andy Beckwith","Peter Donald Badalamenti II","Christopher S. Capp","Hakeem Kae-Kazim","Ghassan Massoud"]}
]

const IMAGELOCATION = 'images'

function init() {
    addGenreButtons();
    addMovies();

    document.querySelector("#close-button").addEventListener("click", e => {
        document.querySelector("main").classList.add("collapsed");
    });
}

function getIdParameter(parametername) {
    const url = new URL(document.location);
    const parameters = url.searchParams;
    return parameters.get(parametername) || 0;
}

function genreListElement(genreId, genreName) {
    return `<li data-genre-id="${genreId}"><a href="?genre=${genreId}">${genreName}</a></li>`;
}

function addGenreButtons() {
    const genreElement = document.querySelector("#genres");
    const data = GENRES;

    genreElement.insertAdjacentHTML('beforeend', `<li data-genre-id="0"><a href="?genre=0">All</a></li>`)
    data.forEach(genreobject => {
        const {genre_id : genreId, genre : genreName} = genreobject;
        genreElement.insertAdjacentHTML('beforeend', genreListElement(genreId, genreName));
    });


    const genreFilter = getIdParameter("genre");
    document.querySelector(`#genres li[data-genre-id="${genreFilter}"] a`)?.classList.add("active");
}

function addMovieCard(movieObject) {
    const card = document.querySelector("#movie-card").content.cloneNode(true);
    card.querySelector("article").dataset.movieId = movieObject.movie_id;

    const imageElement = card.querySelector("img");
    imageElement.src = `${IMAGELOCATION}/${movieObject.imagename}`;
    imageElement.title = movieObject.title;
    imageElement.alt = movieObject.title;
    card.querySelector("h3").innerText = movieObject.title;
    return card;
}

function addMovies() {
    const movieelement = document.querySelector("#movie-list");

    movieelement.addEventListener("click", (e) => {
        let clickedMovieId = parseInt(e.target.closest("[data-movie-id]")?.dataset.movieId);
        if (clickedMovieId !== undefined) showMovieData(clickedMovieId);
    });
    
    const data = MOVIES;
    data.forEach(movieObject => {
        const card = addMovieCard(movieObject);
        movieelement.appendChild(card);
    });
}

function showMovieData(movieId) {
    const detailsElement = document.querySelector("#highlighted-movie");

    const movieObject = MOVIE_DETAILS.find(movie => movie.movie_id === movieId);
    detailsElement.querySelector("h2").innerText = movieObject.title;

    const imageElement = detailsElement.querySelector("img");
    imageElement.src = `${IMAGELOCATION}/${movieObject.imagename}`;
    imageElement.title = movieObject.title;
    imageElement.alt = movieObject.title;

    detailsElement.querySelector("#movie-overview").innerText = movieObject.overview;

    const genreElement = detailsElement.querySelector("#movie-genres");
    genreElement.innerHTML = "";
    movieObject.genres.forEach(genre => {
        genreElement.insertAdjacentHTML('beforeend', `<li>${genre}</li>`)
    })

    const actorsElement = detailsElement.querySelector("#movie-actors");
    actorsElement.innerHTML = "";
    movieObject.actors.forEach(actor => {
        actorsElement.insertAdjacentHTML('beforeend', `<li>${actor}</li>`)
    })

    const statsElement = detailsElement.querySelector("#movie-stats");
    statsElement.innerHTML = "";
    statsElement.insertAdjacentHTML('beforeend', `<li>${movieObject.score} / 10`);
    statsElement.insertAdjacentHTML('beforeend', `<li>${movieObject.release_date}`);
    statsElement.insertAdjacentHTML('beforeend', `<li>${movieObject.runtime} minutes`);

    document.querySelector("main").classList.remove("collapsed");
    actorsElement.scrollTop = 0;
}

init();