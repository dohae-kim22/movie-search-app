import Component from "../core/component";
import { ISimpleMovie } from "../store/movie";

export default class MovieItem extends Component {
  public props!: ISimpleMovie;

  constructor(props: ISimpleMovie) {
    super({ props, tagName: "a" });
  }

  render() {
    this.el.classList.add("movie");
    this.el.innerHTML = /* html */ `
        <div class="info">
            <div class="year">${this.props.Year.trim().split("–")[0]}</div>
            <div class="title">${this.props.Title}</div>
        </div>
    `;
    this.el.setAttribute("href", `/#/movie?id=${this.props.imdbID}`);
    this.el.style.backgroundImage = `url(${this.props.Poster})`;
  }
}
