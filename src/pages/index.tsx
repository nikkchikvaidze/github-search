import { Input } from "../components/Input";
import { MainCard } from "../components/MainCard";
import "./MainPage.css";
import { use, useState } from "react";
import { keepPreviousData, useQueries, useQuery } from "@tanstack/react-query";
import { SkeletonLoader } from "../components/SkeletonLoader";
import { UsersRepository } from "../lib/repository/users";
import type { ApiUser } from "../types/user";
import { Pagination } from "../components/Pagination";
import { useDebounce } from "../hooks/use-debounce";

function MainPage() {
  const [page, setPage] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const { data, isError, isFetching } = useQuery({
    queryKey: ["users", page, debouncedSearchTerm],
    queryFn: () => UsersRepository.getAll(page, searchTerm),
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  const userDetailQueries = useQueries({
    queries:
      data?.items?.map((user) => ({
        queryKey: ["githubUser", user.username],
        queryFn: () => UsersRepository.getUserByUsername(user.username),
        enabled: !!user.username,
        staleTime: 1000 * 60 * 5,
        refetchOnWindowFocus: false,
      })) ?? [],
  });

  const isFetchingData = userDetailQueries.some((d) => d.isFetching);
  const users: ApiUser[] = userDetailQueries
    .map((user) => user.data)
    .filter((user) => user !== undefined);

  function onPreviousPage(): void {
    setPage((prev) => Math.max(prev - 1, 1));
  }
  function onNextPage(): void {
    setPage((prev) => prev + 1);
  }

  function onInputChange(value: string): void {
    setSearchTerm(value);
  }

  return (
    <>
      <div
        style={{ display: "flex", justifyContent: "center" }}
        className="mt-3 mb-3"
      >
        <Input
          value={searchTerm}
          isSearching={isFetching || isFetchingData}
          inputChange={onInputChange}
        />
      </div>
      <div className="d-flex justify-content-center mt-3">
        <div className="cards-container">
          {isFetching || isFetchingData ? (
            <SkeletonLoader />
          ) : (
            users.map((user) => <MainCard key={user.id} user={user} />)
          )}
        </div>
      </div>
      {data?.totalPages && data?.totalPages! > 1 && (
        <Pagination
          page={page}
          totalPages={data.totalPages}
          previousPage={onPreviousPage}
          nextPage={onNextPage}
        />
      )}
    </>
  );
}

export { MainPage };
