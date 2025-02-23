import Store from "../core/store";

const store = new Store({
  searchText: "",
  page: 1,
  movies: [],
});

export default store;
export async function searchMovies(page) {
  const res = await fetch(
    `https://www.omdbapi.com/?apikey=[yourkey]&s=${store.state.searchText}&page=${page}`
  );
  const json = await res.json();
  console.log(json);
}
