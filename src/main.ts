import App from "./App";
import createRouter from "./routes";

const root = document.querySelector("#root");
root?.append(new App().el);

createRouter();
