import { useParams } from "react-router";
import { UsersRepository } from "../lib/repository/users";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { CardTile } from "../components/CardTile";
import type { Tile } from "../types/tile";
import { idGenerator } from "../utils/id-generator";
import { useFavorites } from "../context/favorites";
import type { ApiUser, FavoriteUser } from "../types/user";

function DetailsPage() {
  const { id } = useParams();
  const { data: user, isFetching } = useQuery({
    queryKey: ["user"],
    queryFn: () => UsersRepository.getUserByUsername(id!),
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: false,
  });

  const { add, remove, isFavorite } = useFavorites();

  const generateId = idGenerator();

  const cardDetails: Tile[] = [
    {
      icon: "/assets/icon-location.svg",
      description: user?.location || "Not provided",
    },
    {
      icon: "/assets/icon-twitter.svg",
      description: user?.twitterUsername || "Not provided",
    },
    {
      icon: "/assets/icon-link.svg",
      description: user?.blog || "Not provided",
      isDescriptionLink: true,
    },
    {
      icon: "/assets/icon-organization.svg",
      description: user?.company || "Not provided",
    },
    {
      icon: "/assets/icon-mail.svg",
      description: user?.email || "Not provided",
      isDescriptionEmail: true,
    },
  ].map((tile) => ({
    ...tile,
    id: generateId.next().value,
  }));

  function formatDate(isoDate: string): string {
    const date = new Date(isoDate);

    const formatted = new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(date);
    return `Joined ${formatted}`;
  }

  function setUserFavorite({
    id,
    name,
    username,
    avatar,
    followers,
    repos: repositories,
    link,
  }: ApiUser): FavoriteUser {
    return {
      id,
      name,
      username,
      avatar,
      followers,
      repositories,
      link,
    };
  }

  if (!user) return <p>Something went wrong</p>;

  return (
    <>
      {isFetching ? (
        <div
          style={{
            height: "90vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <span className="spinner" style={{ display: "block" }}></span>
        </div>
      ) : (
        <div
          className="d-flex justify-content-center"
          style={{ alignItems: "center", marginTop: "9rem" }}
        >
          <div className="detail-card-container justify-content-center">
            <div className="d-flex flex-column gap-3 align-items-center">
              <img className={"avatar"} src={user.avatar} />

              <button
                onClick={() => {
                  isFavorite(setUserFavorite(user))
                    ? remove(setUserFavorite(user))
                    : add(setUserFavorite(user));
                }}
                style={{
                  cursor: "pointer",
                  backgroundColor: "transparent",
                  color: `${
                    isFavorite(setUserFavorite(user)) ? "red" : "white"
                  }`,
                  border: `1px solid ${
                    isFavorite(setUserFavorite(user)) ? "red" : "white"
                  }`,
                  borderRadius: "4px",
                  padding: "4px 20px",
                  display: "flex",
                  gap: "10px",
                }}
              >
                <img
                  src={
                    isFavorite(setUserFavorite(user))
                      ? "/assets/icon-heart-filled.svg"
                      : "/assets/icon-heart-outline.svg"
                  }
                />
                {isFavorite(setUserFavorite(user))
                  ? "Remove From Favorites"
                  : "Add to Favorites"}
              </button>
            </div>
            <div className="detail-info-container">
              <div className="title-container">
                <h1 style={{ margin: "0", color: "white" }}>{user.name}</h1>
                <p style={{ color: "white" }}>{formatDate(user.createDate)}</p>
              </div>
              <p className="tag">@{user.username}</p>
              {user.bio && <p className="bio">{user.bio}</p>}
              <div className="more-details" style={{ alignItems: "start" }}>
                <div className="repos-container">
                  <p>Repos</p>
                  <h2>{user.repos.toLocaleString()}</h2>
                  {user.repos > 30 && (
                    <p
                      style={{
                        border: "1px solid white",
                        borderRadius: "5px",
                        padding: "5px 15px",
                      }}
                    >
                      Active Developer
                    </p>
                  )}
                </div>
                <div className="repos-container">
                  <p>Followers</p>
                  <h2>{user.followers.toLocaleString()}</h2>
                  {user.followers > 1000 && (
                    <p
                      style={{
                        border: "1px solid white",
                        borderRadius: "5px",
                        padding: "5px 15px",
                      }}
                    >
                      Popular
                    </p>
                  )}
                </div>
                <div className="repos-container">
                  <p>Following</p>
                  <h2>{user.following}</h2>
                </div>
                <div className="repos-container">
                  <p>Gists:</p>
                  <h2>{user.publicGists}</h2>
                </div>
              </div>
              <div className="additional-details">
                {user &&
                  cardDetails.map((tile) => (
                    <CardTile hasTitle={false} tile={tile} key={tile.id} />
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export { DetailsPage };
