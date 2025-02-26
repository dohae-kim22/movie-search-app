import Store from "../core/store";

export interface ISimpleMovie {
  [key: string]: unknown;
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

interface IDetailedMovie {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  Ratings: {
    Source: string;
    Value: string;
  }[];
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  imdbID: string;
  Type: string;
  DVD: string;
  BoxOffice: string;
  Production: string;
  Website: string;
  Response: string;
}

interface IState {
  searchText: string;
  page: number;
  pageMax: number;
  movies: ISimpleMovie[];
  movie: IDetailedMovie;
  loading: boolean;
  message: string;
}

const store = new Store<IState>({
  searchText: "",
  page: 1,
  pageMax: 1,
  movies: [],
  movie: {} as IDetailedMovie,
  loading: false,
  message: "Looking for a movie? Start by entering the title!",
});

export default store;
export async function searchMovies(page: number) {
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

export async function getMovieDetails(id: number) {
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
