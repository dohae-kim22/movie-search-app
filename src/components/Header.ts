import Component from "../core/component";
import movieStore from "../store/movie";

interface IState {
  [key: string]: unknown;
  menus: {
    name: string;
    href: string;
  }[];
}

export default class Header extends Component {
  public state!: IState;

  constructor() {
    super({
      tagName: "header",
      state: {
        menus: [
          {
            name: "Search",
            href: "#/",
          },
          {
            name: "Movie",
            href: "#/movie?id=tt1262426",
          },
          {
            name: "About",
            href: "#/about",
          },
        ],
      },
    });
    window.addEventListener("popstate", () => {
      this.render();
    });
  }
  render() {
    const recentMovieId = movieStore.state.movie.imdbID;
    if (recentMovieId) {
      this.state.menus.find(
        (menu) => menu.name === "Movie"
      )!.href = `#/movie?id=${recentMovieId}`;
    }
    this.el.classList.add("header");
    this.el.innerHTML = /* html */ `
        <a href="#/" class="logo">
            <img src="https://cdn-icons-png.flaticon.com/128/15742/15742016.png" alt="logo"/>
        </a>
        <nav>
            <ul>
                ${this.state.menus
                  .map((menu) => {
                    const href = menu.href.split("?")[0];
                    const hash = location.hash.split("?")[0];
                    const isActive = href === hash;
                    return /* html */ `
                        <li>
                            <a class = "${isActive ? "active" : ""}"
                               href = ${menu.href}> 
                               ${menu.name} 
                            </a>
                        </li>
                    `;
                  })
                  .join("")}
            </ul>
        </nav>
    `;
  }
}
