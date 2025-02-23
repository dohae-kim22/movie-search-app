import Store from "../core/store";

const { APIKEY } = process.env;

const store = new Store({
  searchText: "",
  page: 1,
  movies: [],
});

export default store;
export async function searchMovies(page) {
  if (page === 1) {
    store.state.movies = [];
    store.state.page = 1;
  }

  const res = await fetch(
    `https://www.omdbapi.com/?apikey=${APIKEY}&s=${store.state.searchText}&page=${page}`
  );
  const { Search } = await res.json();
  store.state.movies = [...store.state.movies, ...Search];
}
