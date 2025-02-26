import Store from "../core/store";

interface IState {
  image: string;
  name: string;
  email: string;
  github: string;
}

const store = new Store<IState>({
  image:
    "https://avatars.githubusercontent.com/u/149057689?s=400&u=1dc5975e259e94249cfe8c1adc47a0c66a4258d9&v=4",
  name: "KIMII / DoHae KIM",
  email: "dohae.kim22@gmail.com",
  github: "https://github.com/dohae-kim22/movie-search-app",
});

export default store;
