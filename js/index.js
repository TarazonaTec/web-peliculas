const URL_PATH = "https://api.themoviedb.org";
const API_KEY = "18d31574b22476636d52d019054b23f3";

document.addEventListener("DOMContentLoaded", async () => {
  renderNewsMovies();
  renderListMovies("popular", ".now_playing__list");
  renderListMovies("top_rated", ".top-rated-playing__list");
});
const getMovies = (type) => {
  const url = `${URL_PATH}/3/movie/${type}?api_key=${API_KEY}&language=es-ES&page=1`;
  return fetch(url)
    .then((response) => response.json())
    .then((result) => result.results)
    .catch((error) => console.log(error));
};

const renderNewsMovies = async () => {
  const newMovie = await getMovies("now_playing");
  let html = "";
  newMovie.forEach((movie, index) => {
    const { id, title, overview, backdrop_path } = movie;
    const urlImage = `https://image.tmdb.org/t/p/original${backdrop_path}`;
    html += `<div class="carousel-item ${index === 0 ? "active" : null}" >
        <img src="${urlImage}" class="d-block w-100" alt="...">

        <div class="carousel-caption d-none d-md-block">
        <h5>${title}</h5>
        <p>${overview}</p>
      </div>


      </div>`;
  });

  const carouselInner = document.querySelector(".list-news-movies");

  carouselInner.innerHTML = html;
};

const renderListMovies = async (type, selector) => {
  const popularMovie = await getMovies(type, "popular");
  let html = "";
  popularMovie.forEach((movie, index) => {
    const { id, title, poster_path } = movie;
    const movieCover = `https://image.tmdb.org/t/p/original${poster_path}`;
    const urlMovie = `../pelicula.html?id=${id}`;
    if (index < 5) {
      html += `<li class="list-group-item">
    <img src="${movieCover}" alt="${title}">
    <h3>${title}</h3>
    <a class="btn btn-primary" href="${urlMovie}" role="button">Link</a>
    </li>
   `;
    }
  });

  const nowPlayingList = document.querySelector(selector);

  nowPlayingList.innerHTML = html;
};
