import { useNavigate } from "react-router";
import type { Tile } from "../types/tile";
import type { ApiUser, User } from "../types/user";
import { CardTile } from "./CardTile";
import { idGenerator } from "../utils/id-generator";

type MainCardProps = {
  user: ApiUser;
};

function MainCard({
  user: { avatar, username, followers, repos },
}: MainCardProps) {
  const generateId = idGenerator();
  const navigate = useNavigate();

  const cardTileDetails: Tile[] = [
    { icon: "assets/icon-user.svg", title: "Username", description: username },
    {
      icon: "assets/icon-group.svg",
      title: "Followers",
      description: followers,
    },
    { icon: "assets/icon-code.svg", title: "Repos", description: repos },
  ].map((tile) => ({
    ...tile,
    id: generateId.next().value,
  }));

  return (
    <>
      <div
        className="main-card-container d-flex gap-3"
        onClick={() => navigate(`/user/${username}`)}
      >
        <img className={"avatar"} src={avatar} />
        <div className="card-info-wrapper">
          {cardTileDetails.map((tile) => (
            <CardTile tile={tile} hasTitle={true} key={tile.id} />
          ))}
        </div>
      </div>
    </>
  );
}

export { MainCard };
