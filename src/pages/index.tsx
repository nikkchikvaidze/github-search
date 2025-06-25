import { Input } from "../components/Input";
import { MainCard } from "../components/MainCard";
import { useState } from "react";
import { keepPreviousData, useQueries, useQuery } from "@tanstack/react-query";
import { SkeletonLoader } from "../components/SkeletonLoader";
import { UsersRepository } from "../lib/repository/users";
import type { ApiUser } from "../types/user";
import { Pagination } from "../components/Pagination";
import { useDebounce } from "../hooks/use-debounce";
import { Empty } from "../components/Empty";

function MainPage() {
  const [page, setPage] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const { data, isFetching } = useQuery({
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

  const isEmpty = users.length === 0;

  function onPreviousPage(): void {
    setPage((prev) => Math.max(prev - 1, 1));
  }
  function onNextPage(): void {
    setPage((prev) => prev + 1);
  }

  function onInputChange(value: string): void {
    setSearchTerm(value);
    setPage(1);
  }

  return (
    <>
      <div className="mt-4 mb-4 flex justify-center">
        <Input
          value={searchTerm}
          isSearching={isFetching || isFetchingData}
          inputChange={onInputChange}
        />
      </div>
      {!isFetching && !isFetchingData && isEmpty ? (
        <Empty />
      ) : (
        <div className="flex justify-center mt-4 flex-col items-center">
          <div className="grid gap-4 [grid-template-columns:repeat(3,400px)]">
            {isFetching || isFetchingData ? (
              <SkeletonLoader />
            ) : (
              users.map((user) => <MainCard key={user.id} user={user} />)
            )}
          </div>

          {data?.totalPages && data?.totalPages! > 1 && (
            <Pagination
              page={page}
              totalPages={data.totalPages}
              previousPage={onPreviousPage}
              nextPage={onNextPage}
            />
          )}
        </div>
      )}
    </>
  );
}

export { MainPage };
