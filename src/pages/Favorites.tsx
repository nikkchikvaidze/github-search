import { useFavorites } from "../context/favorites";

function FavoritesPage() {
  const { favorites, remove } = useFavorites();

  if (!favorites.length) {
    return (
      <div className="text-center pt-[14rem] text-white">
        <h1>Favorites List is empty</h1>
      </div>
    );
  }
  return (
    <div className="ml-8 mr-8 text-white">
      <h3 className="mb-8">Favorites List</h3>
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th>User</th>
            <th>Followers</th>
            <th>Repositories</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {favorites.map((favorite) => {
            return (
              <tr
                style={{
                  textAlign: "center",
                  borderBottom: "1px solid #c5c5c59c",
                }}
              >
                <td>
                  <div className="py-[10px] px-0 flex">
                    <img
                      className="w-[50px] h-auto mr-8 rounded-full shadow-[0_0_10px_#646464]"
                      src={favorite.avatar}
                    />
                    <div className="flex flex-col items-start">
                      <p>{favorite.name}</p>
                      <p className="text-[10px]">@{favorite.username}</p>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="py-[10px] px-0 ">
                    {favorite.followers.toLocaleString()}
                  </div>
                </td>
                <td>
                  <div className="py-[10px] px-0 ">
                    {favorite.repos.toLocaleString()!}
                  </div>
                </td>
                <td>
                  <div className="py-[10px] px-0 flex justify-center">
                    <img
                      src="assets/icon-delete.svg"
                      alt="icon-remove"
                      className="cursor-pointer"
                      onClick={() => remove(favorite)}
                    />
                    <a href={favorite.link} target="_blank">
                      <img
                        className="cursor-pointer ml-[10px]"
                        src="assets/icon-redirect.svg"
                        alt="icon-link"
                      />
                    </a>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export { FavoritesPage };
