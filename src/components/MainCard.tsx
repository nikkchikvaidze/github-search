import { useNavigate } from "react-router";
import type { Tile } from "../types/tile";
import type { ApiUser } from "../types/user";
import { CardTile } from "./CardTile";
import { idGenerator } from "../utils/id-generator";

type MainCardProps = {
  user: ApiUser;
};

function MainCard({ user: { avatar, username, followers, repos } }: MainCardProps) {
  const generateId = idGenerator();
  const navigate = useNavigate();

  const cardTileDetails: Tile[] = [
    { icon: "assets/icon-user.svg", title: "Username", description: username },
    {
      icon: "assets/icon-group.svg",
      title: "Followers",
      description: followers.toLocaleString(),
      // id: someId, სასრული რაოდენობა გვაქვს, ამიტომ დამატებით იტერაცია არ გინდა სათითაოდ შეგიძლია id დაუსეტო
      // ან საერთოდ არ დავუსეტავდი ჯსქში აიდათ `${i}-{tile.title}` საკმარისი იქნება
    },
    { icon: "assets/icon-code.svg", title: "Repos", description: repos },
  ].map((tile) => ({
    ...tile,
    id: generateId.next().value,
  }));

  return (
    <>
      <div
        className="flex w-[360px] cursor-pointer gap-4 rounded-[8px] border border-white bg-[#1e2a47] p-4 text-white transition-transform duration-300 ease-in-out hover:scale-110"
        onClick={() => navigate(`/user/${username}`)}
      >
        <img
          className="h-32 w-32 rounded-full shadow-[0_0_10px_#646464]"
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
