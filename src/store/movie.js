import Store from "../core/store";

const store = new Store({
  searchText: "",
  page: 1,
  pageMax: 1,
  movies: [],
  movie: {},
  loading: false,
  message: "Looking for a movie? Start by entering the title!",
});

export default store;
export async function searchMovies(page) {
  store.state.loading = true;
  store.state.page = page;

  if (page === 1) {
    store.state.movies = [];
  }

  try {
    const res = await fetch("/api/movie", {
      method: "POST",
      body: JSON.stringify({
        title: store.state.searchText,
        page,
      }),
    });
    const { Search, totalResults, Response, Error } = await res.json();

    if (Response === "True") {
      store.state.movies = [...store.state.movies, ...Search];
      store.state.pageMax = Math.ceil(Number(totalResults) / 10);
      store.state.message = "";
    } else {
      store.state.message = Error;
      store.state.pageMax = 1;
    }
  } catch (error) {
    store.state.message = "Please try again.";
  } finally {
    store.state.loading = false;
  }
}

export async function getMovieDetails(id) {
  try {
    const res = await fetch("/api/movie", {
      method: "POST",
      body: JSON.stringify({
        id,
      }),
    });
    store.state.movie = await res.json();
  } catch (error) {
    console.log("getMovieDetails error : ", error);
  }
}
