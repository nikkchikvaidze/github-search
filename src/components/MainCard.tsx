import { useNavigate } from "react-router";
import type { Tile } from "../types/tile";
import type { ApiUser } from "../types/user";
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
      description: followers.toLocaleString(),
    },
    { icon: "assets/icon-code.svg", title: "Repos", description: repos },
  ].map((tile) => ({
    ...tile,
    id: generateId.next().value,
  }));

  return (
    <>
      <div
        className="    border border-white
    p-4
    rounded-[8px]
    bg-[#1e2a47]
    w-[360px]
    text-white
    cursor-pointer
    transition-transform
    duration-300
    ease-in-out
    hover:scale-110 flex gap-4"
        onClick={() => navigate(`/user/${username}`)}
      >
        <img
          className="w-32 h-32 rounded-full shadow-[0_0_10px_#646464]"
          src={avatar}
        />
        <div className="flex flex-col items-start justify-evenly">
          {cardTileDetails.map((tile) => (
            <CardTile
              tile={tile}
              hasTitle={true}
              key={tile.id}
              isForMainCard={true}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export { MainCard };
