const BASEURL = 'http://localhost:3000'


const IMAGELOCATION = 'images'

function init() {
    addGenreButtons();
    setPreviousNextLinks();
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

async function addGenreButtons() {
    const genreElement = document.querySelector("#genres");
    const data = await fetch(`${BASEURL}/genres`).then(resp => resp.json());

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

async function addMovies() {
    const movieelement = document.querySelector("#movie-list");

    movieelement.addEventListener("click", (e) => {
        let clickedMovieId = parseInt(e.target.closest("[data-movie-id]")?.dataset.movieId);
        if (clickedMovieId !== undefined) showMovieData(clickedMovieId);
    });
    
    const data = await fetch(`${BASEURL}/movies?genre=${getIdParameter("genre")}&page=${getIdParameter("page")}`).then(result => result.json());
    data.forEach(movieObject => {
        const card = addMovieCard(movieObject);
        movieelement.appendChild(card);
    });
}

async function showMovieData(movieId) {
    const detailsElement = document.querySelector("#highlighted-movie");

    const movieObject = await fetch(`${BASEURL}/movies/${movieId}`).then(res => res.json());
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

function setPreviousNextLinks() {
    const pageNumber = Math.max(getIdParameter("page"), 1);
    const currentGenre = getIdParameter("genre");
    document.querySelector("#current-page").innerText = pageNumber;

    if (pageNumber < 2) document.querySelector("#prev-page").classList.add("hidden");
    else document.querySelector("#prev-page").classList.remove("hidden");

    document.querySelector("#prev-page").href = `?genre=${currentGenre}&page=${pageNumber - 1}`;
    document.querySelector("#next-page").href = `?genre=${currentGenre}&page=${pageNumber + 1}`;
}
