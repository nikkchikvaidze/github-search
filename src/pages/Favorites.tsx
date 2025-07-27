import { useFavorites } from "../context/favorites";

function FavoritesPage() {
  const { favorites, remove } = useFavorites();

  if (!favorites.length) {
    return (
      <div className="pt-[14rem] text-center text-white">
        <h1>Favorites List is empty</h1>
      </div>
    );
  }
  return (
    <div className="mr-8 ml-8 text-white">
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
                key={favorite.id}
                // ტაილვინდის უტილიტი კლასებით შეგიძლია მსგავსი სტილის გაკეთება
                // თუ რაიმე კონკრეტული ქეისი არ გვაქ,  ჯობია ავირიდოთ
                // style გამოყენება
                style={{
                  textAlign: "center",
                  borderBottom: "1px solid #c5c5c59c",
                }}
              >
                <td>
                  <div className="flex px-0 py-[10px]">
                    <img
                      className="mr-8 h-auto w-[50px] rounded-full shadow-[0_0_10px_#646464]"
                      src={favorite.avatar}
                    />
                    <div className="flex flex-col items-start">
                      <p>{favorite.name}</p>
                      <p className="text-[10px]">@{favorite.username}</p>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="px-0 py-[10px]">
                    {favorite.followers.toLocaleString()}
                  </div>
                </td>
                <td>
                  <div className="px-0 py-[10px]">
                    {favorite.repos?.toLocaleString()}
                  </div>
                </td>
                <td>
                  {/*                                      py-2.5 იგივეა   */}
                  <div className="flex justify-center px-0 py-[10px]">
                    <img
                      src="assets/icon-delete.svg"
                      alt="icon-remove"
                      className="cursor-pointer"
                      onClick={() => remove(favorite)}
                    />
                    <a href={favorite.link} target="_blank">
                      <img
                        //           ml-2.5
                        className="ml-[10px] cursor-pointer"
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
