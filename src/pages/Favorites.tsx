import { useFavorites } from "../context/favorites";

function FavoritesPage() {
  const { favorites, remove } = useFavorites();

  if (!favorites.length) {
    return (
      <div style={{ textAlign: "center", paddingTop: "14rem", color: "white" }}>
        <h1>Favorites List is empty</h1>
      </div>
    );
  }
  return (
    <div style={{ marginLeft: "2rem", marginRight: "2rem" }}>
      <h3 style={{ color: "white" }}>Favorites List</h3>
      <table
        style={{
          width: "100%",
          color: "white",
          borderCollapse: "collapse",
        }}
      >
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
                  <div style={{ padding: "10px 0" }}>
                    <img className="avatar sm-avatar" src={favorite.avatar} />
                  </div>
                </td>
                <td>
                  <div style={{ padding: "10px 0" }}>
                    {favorite.followers.toLocaleString()}
                  </div>
                </td>
                <td>
                  <div style={{ padding: "10px 0" }}>
                    {favorite.repositories.toLocaleString()}
                  </div>
                </td>
                <td>
                  <div style={{ padding: "10px 0" }}>
                    <img
                      style={{ cursor: "pointer" }}
                      src="assets/icon-delete.svg"
                      alt="icon-user"
                      onClick={() => remove(favorite)}
                    />
                    <a href={favorite.link} target="_blank">
                      <img
                        style={{ cursor: "pointer", marginLeft: "10px" }}
                        src="assets/icon-redirect.svg"
                        alt="icon-user"
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
