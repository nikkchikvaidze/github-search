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
    <div className="d-flex gap-3 justify-content-center align-items-center mt-3 mb-3">
      {page > 1 && (
        <button
          className="pagination-button"
          style={{ cursor: "pointer" }}
          onClick={previousPage}
        >
          Previous
        </button>
      )}
      <p style={{ color: "white" }}>{page}</p>
      {page < Math.ceil(totalPages / 15) && (
        <button
          className="pagination-button"
          style={{ cursor: "pointer" }}
          onClick={nextPage}
        >
          Next
        </button>
      )}
    </div>
  );
}

export { Pagination };
