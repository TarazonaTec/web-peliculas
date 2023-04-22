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
  const { backdrop_path, poster_path,title } = movieDetails;
  renderBackground(backdrop_path);
  renderPoster(poster_path,title);
  console.log(movieDetails);
};

const renderBackground = (backdrop_path) => {
  const urlBackground = `https://image.tmdb.org/t/p/original${backdrop_path}`;

  const divMovieInfo = document.querySelector(".movie-info");

  divMovieInfo.style.backgroundImage = `url('${urlBackground}')`;
};

const renderPoster=(poster_path,title)=>{
   const urlPoster=`https://image.tmdb.org/t/p/original${poster_path}`;
   const html=`<img src='${urlPoster}' class='img-fluid movie-info__poster-img' alt='${title}'>`;
   
   const divMovieInfo = document.querySelector(".movie-info__poster");

   divMovieInfo.innerHTML = `${html}`;
}

const renderMovieInfo = (info) => {
  
};
