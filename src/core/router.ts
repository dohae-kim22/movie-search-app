import Component from "./component";

interface IRoute {
  path: string;
  component: typeof Component;
}

interface IQuery {
  [key: string]: string;
}

export default function createRouter(routes: IRoute[]) {
  return function () {
    window.addEventListener("popstate", () => {
      routeRender(routes);
    });
    routeRender(routes);
  };
}

function routeRender(routes: IRoute[]) {
  if (!location.hash) {
    history.replaceState(null, "", "/#/");
  }
  const routerView = document.querySelector("router-view");
  const [hash, queryString = ""] = location.hash.split("?");

  //   Parse query string into an object
  const query = queryString.split("?").reduce((acc, cur) => {
    const [key, value] = cur.split("=");
    acc[key] = value;
    return acc;
  }, {} as IQuery);
  history.replaceState(query, ""); // Save query to the browser history state

  // Find the current route that matches the hash and render
  const currentRoute = routes.find((route) =>
    new RegExp(`${route.path}/?$`).test(hash)
  );
  if (routerView) {
    routerView.innerHTML = "";
    currentRoute && routerView.append(new currentRoute.component().el);
  }

  // Reset scroll position after route change
  window.scrollTo(0, 0);
}
