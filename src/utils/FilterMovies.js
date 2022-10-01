import { SHORT_FILM } from "./constants";

// const filterDuration = (movies) =>
//   movies.filter((movie) => movie.duration <= SHORT_FILM);

function filterDuration(el) {
  
  return el.filter((el) => {
    return el.duration <= SHORT_FILM;
  });
}

const filterMovies = (arr, query) =>
    arr.filter(
    (el) => el.nameRU.toLowerCase().indexOf(query.toLowerCase()) !== -1
  );

export { filterDuration, filterMovies }