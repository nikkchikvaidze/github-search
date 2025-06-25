import { useParams } from "react-router";
import { UsersRepository } from "../lib/repository/users";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { CardTile } from "../components/CardTile";
import type { Tile } from "../types/tile";
import { idGenerator } from "../utils/id-generator";
import { useFavorites } from "../context/favorites";

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

  if (!user) return <p>Something went wrong</p>;

  return (
    <>
      {isFetching ? (
        <div className="flex justify-center items-center h-[90vh]">
          <span className="spinner"></span>
        </div>
      ) : (
        <div className="flex justify-center items-center mt-[9rem]">
          <div className="bg-[#1e2a47] rounded-[10px] gap-12 p-8 flex justify-center">
            <div className="flex flex-col gap-4 items-center">
              <img
                className="w-32 h-32 rounded-full shadow-[0_0_10px_#646464]"
                src={user.avatar}
              />

              <button
                onClick={() => {
                  isFavorite(user) ? remove(user) : add(user);
                }}
                className={`cursor-pointer rounded-[4px] px-[20px] py-[4px] flex gap-[10px] bg-transparent ${
                  isFavorite(user) ? "text-red-500" : "text-white"
                }`}
              >
                <img
                  src={
                    isFavorite(user)
                      ? "/assets/icon-heart-filled.svg"
                      : "/assets/icon-heart-outline.svg"
                  }
                />
                {isFavorite(user)
                  ? "Remove From Favorites"
                  : "Add to Favorites"}
              </button>
            </div>
            <div>
              <div className="flex items-center justify-between gap-16">
                <h1 className="m-0 text-white">{user.name}</h1>
                <p className="text-white">{formatDate(user.createDate)}</p>
              </div>
              <p className="text-[#60abff] text-xs">@{user.username}</p>
              {user.bio && (
                <p className="mt-8 block text-[#646464] w-[500px]">
                  {user.bio}
                </p>
              )}
              <div className="bg-[#141d2f] rounded-[10px] flex justify-around text-white py-4 mt-4 items-start w-[500px]">
                <div className="flex flex-col justify-center items-center">
                  <p>Repos</p>
                  <h2>{user.repos.toLocaleString()}</h2>
                  {user.repos > 30 && (
                    <p className="border border-white rounded-[5px] py-[5px] px-[15px] text-[12px] mt-4">
                      Active Developer
                    </p>
                  )}
                </div>
                <div className="flex flex-col justify-center items-center">
                  <p>Followers</p>
                  <h2>{user.followers.toLocaleString()}</h2>
                  {user.followers > 1000 && (
                    <p className="border border-white rounded-[5px] py-[5px] px-[15px] text-[12px] mt-4">
                      Popular
                    </p>
                  )}
                </div>
                <div className="flex flex-col justify-center items-center">
                  <p>Following</p>
                  <h2>{user.following}</h2>
                </div>
                <div className="flex flex-col justify-center items-center">
                  <p>Gists</p>
                  <h2>{user.publicGists}</h2>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-6 text-white">
                {user &&
                  cardDetails.map((tile) => (
                    <CardTile
                      hasTitle={false}
                      tile={tile}
                      key={tile.id}
                      isForMainCard={false}
                    />
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
