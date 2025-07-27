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

  // /lib/utils/date.ts  ში გავიტანოთ
  function formatDate(isoDate: string): string {
    const date = new Date(isoDate);

    const formatted = new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(date);
    return `Joined ${formatted}`;
  }

  // ბაგი გაქვს /user/some-user ფეიჯის რეფრეშზე Something went wrong ყოველ ჯერზე ჯერ went wrong იხატება შემდეგ იუზერის დეტალები
  if (!user) return <p>Something went wrong</p>;

  return (
    <>
      {isFetching ? (
        <div className="flex h-[90vh] items-center justify-center">
          <span className="spinner"></span>
        </div>
      ) : (
        <div className="mt-[9rem] flex items-center justify-center">
          <div className="flex justify-center gap-12 rounded-[10px] bg-[#1e2a47] p-8">
            <div className="flex flex-col items-center gap-4">
              <img
                className="h-32 w-32 rounded-full shadow-[0_0_10px_#646464]"
                src={user.avatar}
              />

              <button
                onClick={() => {
                  // ესეთი ჩანაწერი უფრო კითხვადია
                  const favorite = isFavorite(user);
                  if (favorite) {
                    remove(user);
                  } else {
                    add(user);
                  }
                }}
                className={`flex cursor-pointer gap-[10px] rounded-[4px] bg-transparent px-[20px] py-[4px] ${
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
                {isFavorite(user) ? "Remove From Favorites" : "Add to Favorites"}
              </button>
            </div>
            <div>
              <div className="flex items-center justify-between gap-16">
                <h1 className="m-0 text-white">{user.name}</h1>
                <p className="text-white">{formatDate(user.createDate)}</p>
              </div>
              <p className="text-xs text-[#60abff]">@{user.username}</p>
              {user.bio && (
                <p className="mt-8 block w-[500px] text-[#646464]">{user.bio}</p>
              )}
              <div className="mt-4 flex w-[500px] items-start justify-around rounded-[10px] bg-[#141d2f] py-4 text-white">
                <div className="flex flex-col items-center justify-center">
                  <p>Repos</p>
                  <h2>{user.repos.toLocaleString()}</h2>
                  {user.repos > 30 && (
                    <p className="mt-4 rounded-[5px] border border-white px-[15px] py-[5px] text-[12px]">
                      Active Developer
                    </p>
                  )}
                </div>
                <div className="flex flex-col items-center justify-center">
                  <p>Followers</p>
                  <h2>{user.followers.toLocaleString()}</h2>
                  {user.followers > 1000 && (
                    <p className="mt-4 rounded-[5px] border border-white px-[15px] py-[5px] text-[12px]">
                      Popular
                    </p>
                  )}
                </div>
                <div className="flex flex-col items-center justify-center">
                  <p>Following</p>
                  <h2>{user.following}</h2>
                </div>
                <div className="flex flex-col items-center justify-center">
                  <p>Gists</p>
                  <h2>{user.publicGists}</h2>
                </div>
              </div>
              <div className="mt-6 grid grid-cols-2 gap-4 text-white">
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
