const URL_PATH = "https://api.themoviedb.org";
const API_KEY = "18d31574b22476636d52d019054b23f3";

document.addEventListener("DOMContentLoaded", async () => {
  let { page } = getUrlVars();
  page === undefined ? (page = 1) : null;
  renderPopularMovies(page);
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

const getPopularMovies = (page) => {
  const url = `${URL_PATH}/3/movie/popular?api_key=${API_KEY}&language=es-ES&page=${page}`;
  return fetch(url)
    .then((response) => response.json())
    .then((result) => result)
    .catch((error) => console.error(error));
};

const renderPopularMovies = async (page) => {
  const movies = await getPopularMovies(page);
  let html = "";

  movies.results.forEach((movie) => {
    const { id, title, poster_path } = movie;
    const urlPoster = `https://image.tmdb.org/t/p/w500${poster_path}`;
    const urlMoreInfo=`../pelicula.html?id=${id}`;

    html += `<div class="card" style="width: 18rem;">
     <a href="${urlMoreInfo}">
   <img src="${urlPoster}" class="card-img-top" alt="${title}">
   <div class="card-body">
     <h5 class="card-title">${title}</h5>
 
   </div>
   </a>

 </div>`;
  });

  const divListCards = document.querySelector(".list-cards");

divListCards.innerHTML=`${html}`;

};
