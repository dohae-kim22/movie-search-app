import { Component } from "../core/component";

export default class Headline extends Component {
  render() {
    this.el.classList.add("headline");
    this.el.innerHTML = /* html */ `
    <h1>
        <span>OMDb API:</span><br/>
        SEARCH AND DISCOVER<br/>
        MOVIES IN ONE PLACE
    </h1>
    <p>
        <span>Access Movie Information Instantly, Powered by OMDb API</span><br/>
        Easily search for movies, view ratings, posters, and more, all in one seamless experience. All content is contributed and maintained by movie enthusiasts.
    </p>
    `;
  }
}
