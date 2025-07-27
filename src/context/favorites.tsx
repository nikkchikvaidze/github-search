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

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

function FavoritesContextProvider({ children }: FavoritesContextProviderProps) {
  const [favorites, setFavorites] = useState<ApiUser[]>(() => {
    const favoriteUsersFromLocalStorage = localStorage.getItem("favorites");
    if (favoriteUsersFromLocalStorage)
      return JSON.parse(favoriteUsersFromLocalStorage);
    return [];
  });

  //  setFavorites ქოლბექში  მხოლოდ საწყისი მნიშვნელობა განახლდეს,
  //  საიდეფექტებს თავიდან ავიცილებთ
  //  იუზეფექით შეგიიძლია განაახლო ლოკალსტორეიჯი როცა ფავორიტები იცვლება
  // useEffect(() => {
  //   localStorage.setItem("favorites", JSON.stringify(favorites));
  // }, [favorites]);

  function add(user: ApiUser) {
    // setFavorites ქოლბექში მხოლოდ ფავორიტები განაახლდეს,
    // საიდეფექტებს თავიდან ავიცილებთ
    setFavorites((prev) => {
      const newFavorites = [...prev, user];
      localStorage.setItem("favorites", JSON.stringify(newFavorites));
      return newFavorites;
    });
  }

  // მთლიან user ს რატო აწვდი როცა მხოლოდ id გჭირდება? user.id ხომ საკმარისია?
  function isFavorite(user: ApiUser) {
    return favorites.some((users) => users.id === user.id);
  }

  // აქაც მთლიან user ს რატო აწვდი როცა მხოლოდ id გჭირდება?
  function remove(user: ApiUser) {
    // setFavorites ქოლბექში მხოლოდ ფავორიტები განაახლდეს,
    // საიდეფექტებს თავიდან ავიცილებთ
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

// /hooks/favorites.ts ლოგიკური ადგილი იქნება
function useFavorites() {
  const value = useContext(FavoritesContext);

  if (!value) {
    throw new Error("Your component isn't part of Favorites Context Provider");
  }

  return value;
}

export { FavoritesContextProvider, useFavorites };
