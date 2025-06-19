import { MainPage } from "../pages";
import { DetailsPage } from "../pages/Details";
import { FavoritesPage } from "../pages/Favorites";

enum RoutesConfig {
  HOME = "/",
  USER = "/user/:id",
  FAVORITES = "/favorites",
}

const MainRoutes = [
  { path: RoutesConfig.HOME, page: MainPage },
  { path: RoutesConfig.FAVORITES, page: FavoritesPage },
  { path: RoutesConfig.USER, page: DetailsPage },
];

export { MainRoutes, RoutesConfig };
