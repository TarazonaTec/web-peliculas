const URL_PATH = "https://api.themoviedb.org";
const API_KEY = "18d31574b22476636d52d019054b23f3";
let movieID = "";

document.addEventListener("DOMContentLoaded", async () => {
  movieID = getUrlVars().id;
  renderMovieDetails(movieID);
});

const getUrlVars = () => {
  let vars = {};
  let url = window.location.href.replace(
    /[?&]+([^=&]+)=([^&]*)/gi,
    function (m, key, value) {
      vars[key] = value;
    }
  );
  return vars;
};

const getMovieDetails = (movieid) => {
  const url = `${URL_PATH}/3/movie/${movieid}?api_key=${API_KEY}&language=es-ES`;

  return fetch(url)
    .then((response) => response.json())
    .then((result) => result)
    .catch((error) => console.log(error));
};

const renderMovieDetails = async (movieid) => {
  const movieDetails = await getMovieDetails(movieid);
  const { backdrop_path, poster_path, title, overview, genres, release_date } =
    movieDetails;
  renderBackground(backdrop_path);
  renderPoster(poster_path, title);

  renderMovieData(title, overview, genres, release_date);
  renderTeaser(movieid);
};

const renderBackground = (backdrop_path) => {
  const urlBackground = `https://image.tmdb.org/t/p/original${backdrop_path}`;

  const divMovieInfo = document.querySelector(".movie-info");

  divMovieInfo.style.backgroundImage = `url('${urlBackground}')`;
};

const renderPoster = (poster_path, title) => {
  const urlPoster = `https://image.tmdb.org/t/p/original${poster_path}`;
  const html = `<img src='${urlPoster}' class='img-fluid movie-info__poster-img' alt='${title}'>`;

  const divMovieInfo = document.querySelector(".movie-info__poster");

  divMovieInfo.innerHTML = `${html}`;
};

const renderMovieInfo = (info) => {};

const renderMovieData = (title, overview, genres, release_date) => {
  let htmlGenres = "";
  for (g of genres) {
    htmlGenres += `<li>${g.name}</li>`;
  }
  const dateSplit = release_date.split("-");
  const year = dateSplit[0];

  const html = `<h2>${title}
  <span clas='date-any'>${year}</span>
  <span clas='teaser' data-bs-toggle="modal" data-bs-target="#video-teaser"> <i class="bi bi-play-fill"></i> Ver trailer</span>
  </h2>
  <h5>General</h5>
  <p>${overview}</p>
  <h5>Generos</h5>
  <ul>
  ${htmlGenres}
  
  </ul>
  `;

  const divMovieInfo = document.querySelector(".movie-info__data");

  divMovieInfo.innerHTML = `${html}`;
};

const getTeaser = (movieid) => {
  const url = `${URL_PATH}/3/movie/${movieid}/videos?api_key=${API_KEY}&language=es-ES`;
  console.log(url);
  return fetch(url)
    .then((response) => response.json())
    .then((result) => result.results)
    .catch((error) => console.log(error));
};

const renderTeaser = async (movieid) => {
  const movieTeaser = await getTeaser(movieid);
  console.log(movieTeaser);
  let keyVideo = "";
  movieTeaser.forEach((element) => {
    if (element.type === "Teaser" && element.site === "YouTube") {
      keyVideo = element.key;
      
    }
  });

  let urlIframe = "";
  if (keyVideo !== "") {
    urlIframe = `<iframe width="100%" height="400" src="https://www.youtube.com/embed/${keyVideo}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`;
  } 
  else {
    urlIframe=`<div>No hay nada</div>`
  }

  const divMovieInfo = document.querySelector(".video-teaser-iframe");

  divMovieInfo.innerHTML = `${urlIframe}`;

};
