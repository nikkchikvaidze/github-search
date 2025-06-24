import { createContext, useContext, useState, type ReactNode } from "react";
import type { FavoriteUser } from "../types/user";

type FavoritesContextType = {
  favorites: FavoriteUser[];
  add: (user: FavoriteUser) => void;
  remove: (user: FavoriteUser) => void;
  isFavorite: (user: FavoriteUser) => boolean;
};

type FavoritesContextProviderProps = {
  children: ReactNode;
};

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined
);

function FavoritesContextProvider({ children }: FavoritesContextProviderProps) {
  const [favorites, setFavorites] = useState<FavoriteUser[]>([]);

  function add(user: FavoriteUser) {
    setFavorites((prev) => [...prev, user]);
  }

  function isFavorite(user: FavoriteUser) {
    return favorites.some((users) => users.id === user.id);
  }

  function remove(user: FavoriteUser) {
    setFavorites((prev) => prev.filter(({ id }) => user.id !== id));
  }

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        add,
        isFavorite,
        remove,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

function useFavorites() {
  const value = useContext(FavoritesContext);

  if (!value) {
    throw new Error("Your component isnt part of Favorites Context Provider");
  }

  return value;
}

export { FavoritesContextProvider, useFavorites };
