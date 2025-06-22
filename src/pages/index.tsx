import { Input } from "../components/Input";
import { MainCard } from "../components/MainCard";
import "./MainPage.css";
import { useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { SkeletonLoader } from "../components/SkeletonLoader";
import { UsersRepository } from "../lib/repository/users";

function MainPage() {
  const [page, setPage] = useState(1);

  const {
    data: users,
    isError,
    isFetching,
  } = useQuery({
    queryKey: ["users", page],
    queryFn: () => UsersRepository.getAll(page),
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  return (
    <>
      <div
        style={{ display: "flex", justifyContent: "center" }}
        className="mt-3 mb-3"
      >
        <Input />
      </div>
      <div className="d-flex justify-content-center mt-3">
        <div className="cards-container">
          {isFetching ? (
            <SkeletonLoader />
          ) : (
            users!.items.map((user) => <MainCard key={user.id} user={user} />)
          )}
        </div>
      </div>
    </>
  );
}

export { MainPage };
