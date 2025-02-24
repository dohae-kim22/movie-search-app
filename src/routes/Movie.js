import Component from "../core/component";
import movieStore, { getMovieDetails } from "../store/movie";

export default class Movie extends Component {
  async render() {
    this.el.classList.add("container", "movie-detail");

    await getMovieDetails(history.state.id);
    const { movie } = movieStore.state;
    const bigPoster = movie.Poster.replace("SX300", "SX700");

    // Poster
    const posterDiv = document.createElement("div");
    posterDiv.classList.add("poster");
    posterDiv.style.backgroundImage = `url(${bigPoster})`;
    this.el.append(posterDiv);

    // Specs container
    const specsDiv = document.createElement("div");
    specsDiv.classList.add("spec");
    this.el.append(specsDiv);

    // Title
    const titleDiv = document.createElement("div");
    titleDiv.classList.add("title");
    titleDiv.textContent = movie.Title;
    specsDiv.append(titleDiv);

    // Labels (Released Date, Runtime, Country)
    const labelsDiv = document.createElement("div");
    labelsDiv.classList.add("labels");
    labelsDiv.innerHTML = /* html */ `
      <span>${movie.Released}</span>
      &nbsp/&nbsp
      <span>${movie.Runtime}</span>
      &nbsp/&nbsp
      <span>${movie.Country}</span>
    `;
    specsDiv.append(labelsDiv);

    // Plot
    if (movie.Plot !== "N/A") {
      const plotDiv = document.createElement("div");
      plotDiv.classList.add("plot");
      plotDiv.textContent = movie.Plot;
      specsDiv.append(plotDiv);
    }

    // Ratings
    if (movie.Ratings !== "N/A") {
      const ratingDiv = document.createElement("div");
      ratingDiv.innerHTML = /* html */ `<h3>Ratings</h3>`;
      movie.Ratings.map((rating) => {
        const ratingP = document.createElement("p");
        ratingP.textContent = `${rating.Source} - ${rating.Value}`;
        ratingDiv.append(ratingP);
      });
      specsDiv.append(ratingDiv);
    }

    // Actors
    if (movie.Actors !== "N/A") {
      const actorDiv = document.createElement("div");
      actorDiv.innerHTML = /* html */ `
        <h3>Actors</h3>
        <p>${movie.Actors}</p>
      `;
      specsDiv.append(actorDiv);
    }

    // Director
    if (movie.Director !== "N/A") {
      const directorDiv = document.createElement("div");
      directorDiv.innerHTML = /* html */ `
        <h3>Director</h3>
        <p>${movie.Director}</p>
      `;
      specsDiv.append(directorDiv);
    }

    // Writer
    if (movie.Writer !== "N/A") {
      const writerDiv = document.createElement("div");
      writerDiv.innerHTML = /* html */ `
        <h3>Writer</h3>
        <p>${movie.Writer}</p>
      `;
      specsDiv.append(writerDiv);
    }

    // Production
    if (movie.Production !== "N/A") {
      const productionDiv = document.createElement("div");
      productionDiv.innerHTML = /* html */ `
        <h3>Production</h3>
        <p>${movie.Production}</p>
      `;
      specsDiv.append(productionDiv);
    }

    // Awards
    if (movie.Awards !== "N/A") {
      const awardDiv = document.createElement("div");
      awardDiv.innerHTML = /* html */ `
        <h3>Awards</h3>
        <p>${movie.Awards}</p>
      `;
      specsDiv.append(awardDiv);
    }

    // Genre
    if (movie.Genre !== "N/A") {
      const genreDiv = document.createElement("div");
      genreDiv.innerHTML = /* html */ `
        <h3>Genre</h3>
        <p>${movie.Genre}</p>
      `;
      specsDiv.append(genreDiv);
    }

    // Language
    if (movie.Language !== "N/A") {
      const languageDiv = document.createElement("div");
      languageDiv.innerHTML = /* html */ `
        <h3>Language</h3>
        <p>${movie.Language}</p>
      `;
      specsDiv.append(languageDiv);
    }

    // BoxOffice
    if (movie.BoxOffice !== "N/A") {
      const boxOfficeDiv = document.createElement("div");
      boxOfficeDiv.innerHTML = /* html */ `
        <h3>BoxOffice</h3>
        <p>${movie.BoxOffice}</p>
      `;
      specsDiv.append(boxOfficeDiv);
    }

    // Rated
    if (movie.Rated !== "N/A") {
      const ratedDiv = document.createElement("div");
      ratedDiv.innerHTML = /* html */ `
        <h3>Rated</h3>
        <p>${movie.Rated}</p>
      `;
      specsDiv.append(ratedDiv);
    }
  }
}
