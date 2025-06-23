import { useParams } from "react-router";
import { UsersRepository } from "../lib/repository/users";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { CardTile } from "../components/CardTile";
import type { Tile } from "../types/tile";
import { idGenerator } from "../utils/id-generator";

function DetailsPage() {
  const { id } = useParams();
  const { data: user, isFetching } = useQuery({
    queryKey: ["user"],
    queryFn: () => UsersRepository.getUserByUsername(id!),
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: false,
  });
  console.log(isFetching, "isfetching");

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

  if (!user) return <p>Loading...</p>;

  return (
    <>
      <div
        className="d-flex justify-content-center"
        style={{ alignItems: "center", marginTop: "9rem" }}
      >
        <div className="detail-card-container">
          <img className={"avatar"} src={user.avatar} />
          <div className="detail-info-container">
            <div className="title-container">
              <h1 style={{ margin: "0", color: "white" }}>{user.name}</h1>
              <p style={{ color: "white" }}>Joined 25 Jan 2011</p>
            </div>
            <p className="tag">@{user.username}</p>
            {user.bio && <p className="bio">{user.bio}</p>}
            <div className="more-details">
              <div className="repos-container">
                <p>Repos</p>
                <h2>{user.repos}</h2>
              </div>
              <div className="repos-container">
                <p>Followers</p>
                <h2>{user.followers}</h2>
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
    </>
  );
}

export { DetailsPage };
