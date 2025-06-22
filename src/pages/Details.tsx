import { useParams } from "react-router";
import { UsersRepository } from "../lib/repository/users";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

function DetailsPage() {
  const { id } = useParams();
  const { data: user, isFetching } = useQuery({
    queryKey: ["user"],
    queryFn: () => UsersRepository.getUserByUsername(id!),
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: false,
  });

  if (!user) return <p>Loading...</p>;

  return (
    <>
      <div
        className="d-flex justify-content-center"
        style={{ alignItems: "center", marginTop: "9rem" }}
      >
        <div className="detail-card-container">
          <img className={"avatar"} src={user.avatar_url!} />
          <div className="detail-info-container">
            <div className="title-container">
              <h1 style={{ margin: "0", color: "white" }}>{user.name}</h1>
              <p style={{ color: "white" }}>Joined 25 Jan 2011</p>
            </div>
            <p className="tag">@{user.login}</p>
            {user.bio && <p className="bio">{user.bio}</p>}
            <div className="more-details">
              <div className="repos-container">
                <p>Repos</p>
                <h2>{user.public_repos}</h2>
              </div>
              <div className="repos-container">
                <p>Followers</p>
                <h2>{user.followers.toLocaleString()}</h2>
              </div>
              <div className="repos-container">
                <p>Following</p>
                <h2>{user.following}</h2>
              </div>
              <div className="repos-container">
                <p>Gists:</p>
                <h2>{user.public_gists}</h2>
              </div>
            </div>
            <div className="additional-details">
              <div className="location-container">
                <img src="/assets/icon-location.svg" alt="icon" />
                <p>{user.location || "Not provided"}</p>
              </div>
              <div className="location-container">
                <img src="/assets/icon-twitter.svg" alt="icon" />
                <p>{user.twitter_username || "Not provided"}</p>
              </div>
              <div className="location-container">
                <img src="/assets/icon-link.svg" alt="icon" />
                {user.blog ? (
                  <a
                    href={
                      user.blog.startsWith("http")
                        ? user.blog
                        : "https://www." + user.blog
                    }
                    target="_blank"
                  >
                    {user.blog}
                  </a>
                ) : (
                  "Not provided"
                )}
              </div>
              <div className="location-container">
                <img src="/assets/icon-organization.svg" alt="icon" />
                <p>{user.company || "Not provided"}</p>
              </div>
              <div className="location-container">
                <img src="/assets/icon-mail.svg" alt="icon" />
                {user.email ? (
                  <a
                    style={{ cursor: "pointer" }}
                    href={`mailto:${user.email}`}
                  >
                    {user.email}
                  </a>
                ) : (
                  "Not provided"
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export { DetailsPage };
