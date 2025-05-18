const BASE_URL_FE = import.meta.env.VITE_FE_BASE;

export const routes = {
  base_url: "",
  home: "home",
  product: "product",
  login: "login",
  logout: "logout",
};

for (let [key, value] of Object.entries(routes)) {
  routes[key] = BASE_URL_FE + value;
}

export default routes;
