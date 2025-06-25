type PaginationProps = {
  page: number;
  totalPages: number;
  previousPage: () => void;
  nextPage: () => void;
};

function Pagination({
  page,
  totalPages,
  previousPage,
  nextPage,
}: PaginationProps) {
  return (
    <div className="flex gap-4 justify-center items-center mt-4 mb-4">
      {page > 1 && (
        <button
          className="bg-[#141d2f] outline-none border border-white rounded-[5px] py-[5px] px-[10px] text-white cursor-pointer"
          onClick={previousPage}
        >
          Previous
        </button>
      )}
      <p className="text-white">{page}</p>
      {page < Math.ceil(totalPages / 15) && (
        <button
          className="bg-[#141d2f] outline-none border border-white rounded-[5px] py-[5px] px-[10px] text-white cursor-pointer"
          onClick={nextPage}
        >
          Next
        </button>
      )}
    </div>
  );
}

export { Pagination };
