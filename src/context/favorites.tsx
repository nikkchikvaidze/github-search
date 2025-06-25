import { createContext, useContext, useState, type ReactNode } from "react";
import type { ApiUser } from "../types/user";

type FavoritesContextType = {
  favorites: ApiUser[];
  add: (user: ApiUser) => void;
  remove: (user: ApiUser) => void;
  isFavorite: (user: ApiUser) => boolean;
};

type FavoritesContextProviderProps = {
  children: ReactNode;
};

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined
);

function FavoritesContextProvider({ children }: FavoritesContextProviderProps) {
  const [favorites, setFavorites] = useState<ApiUser[]>(() => {
    const favoriteUsersFromLocalStorage = localStorage.getItem("favorites");
    if (favoriteUsersFromLocalStorage)
      return JSON.parse(favoriteUsersFromLocalStorage);
    return [];
  });

  function add(user: ApiUser) {
    setFavorites((prev) => {
      const newFavorites = [...prev, user];
      localStorage.setItem("favorites", JSON.stringify(newFavorites));
      return newFavorites;
    });
  }

  function isFavorite(user: ApiUser) {
    return favorites.some((users) => users.id === user.id);
  }

  function remove(user: ApiUser) {
    setFavorites((prev) => {
      const newFavorites = prev.filter(({ id }) => user.id !== id);
      localStorage.setItem("favorites", JSON.stringify(newFavorites));
      return newFavorites;
    });
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
