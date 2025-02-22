export function createRouter(routes) {
  return function () {
    window.addEventListener("popstate", () => {
      routeRender(routes);
    });
    routeRender(routes);
  };
}

function routeRender(routes) {
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
  }, {});
  history.replaceState(query, ""); // Save query to the browser history state

  // Find the current route that matches the hash and render
  const currentRoute = routes.find((route) =>
    new RegExp(`${route.path}/?$`).test(hash)
  );
  //   routerView.innerHTML = "";
  routerView.appendChild(new currentRoute.component().el);

  // Reset scroll position after route change
  window.scrollTo(0, 0);
}
