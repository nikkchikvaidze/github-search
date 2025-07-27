import type { ComponentType } from "react";
import { MainPage } from "../pages";
import { DetailsPage } from "../pages/Details";
import { FavoritesPage } from "../pages/Favorites";

enum RoutesConfig {
  HOME = "/",
  USER = "/user/:id",
  FAVORITES = "/favorites",
}

// ts გარემოში ვართ ინტერფეის გავუკეთოთ, მარტივად შევძლებთ როუტების ტიპიზაციას
export interface MainRoute {
  path: RoutesConfig;
  page: ComponentType;
}

const MainRoutes: MainRoute[] = [
  { path: RoutesConfig.HOME, page: MainPage },
  { path: RoutesConfig.FAVORITES, page: FavoritesPage },
  { path: RoutesConfig.USER, page: DetailsPage },
];

export { MainRoutes, RoutesConfig };
