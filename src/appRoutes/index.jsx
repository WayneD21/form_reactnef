import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import MainLayout from "../Layouts/MainLayout.jsx";
import LoginPage from "../Pages/Login/index.jsx";
import Home from "../Pages/Home/index.jsx";
import Product from "../Pages/Product/index.jsx";
import routes from "../configs/routesPath.js";
import ErrorPage from "../Pages/Error/500.jsx";

export const appRoutes = createBrowserRouter(
  createRoutesFromElements(
    <Route errorElement={<ErrorPage />}>
      <Route path={routes.login} element={<LoginPage />} />
      <Route path={routes.base_url} element={<MainLayout />}>
        <Route path={routes.home} element={<Home />} />
        <Route path={routes.product} element={<Product />} />
      </Route>
    </Route>
  )
);
