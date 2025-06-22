import { useNavigate } from "react-router";
import type { Tile } from "../types/tile";
import type { User } from "../types/user";
import { CardTile } from "./CardTile";

type MainCardProps = {
  user: User;
};

function MainCard({
  user: { avatar, username, followers, repos },
}: MainCardProps) {
  const cardTileDetails: Tile[] = [
    { icon: "assets/icon-user.svg", title: "Username", description: username },
    {
      icon: "assets/icon-group.svg",
      title: "Followers",
      description: followers,
    },
    { icon: "assets/icon-code.svg", title: "Repos", description: repos },
  ];

  const navigate = useNavigate();
  return (
    <>
      <div
        className="main-card-container d-flex gap-3"
        onClick={() => navigate(`/user/${username}`)}
      >
        <img className={"avatar"} src={avatar} />
        <div className="card-info-wrapper">
          {cardTileDetails.map((tile) => (
            <CardTile tile={tile} hasTitle={true} key={tile.description} />
          ))}
        </div>
      </div>
    </>
  );
}

export { MainCard };
