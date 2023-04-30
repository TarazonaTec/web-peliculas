const URL_PATH = "https://api.themoviedb.org";
const API_KEY = "18d31574b22476636d52d019054b23f3";

document.addEventListener("DOMContentLoaded", async () => {});

const searchMovie = () => {
  const inputSearch = document.querySelector("#search-movie");

  let textSearch = inputSearch.value;

  if (textSearch.length < 3) {
    return;
  }

   renderMovies(textSearch);
};

const getMovies = (textSearch) => {
  const url = `${URL_PATH}/3/search/movie?api_key=${API_KEY}&language=es-ES&query=${textSearch}&page=1&include_adult=true`;
  return fetch(url)
    .then((response) => response.json())
    .then((result) => result)
    .catch((error) => console.log(error));
};


const renderMovies = async (textSearch) => {
    const movies = await getMovies(textSearch);
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
  

  