type PaginationProps = {
  page: number;
  totalPages: number;
  previousPage: () => void;
  nextPage: () => void;
};

function Pagination({ page, totalPages, previousPage, nextPage }: PaginationProps) {
  return (
    <div className="mt-4 mb-4 flex items-center justify-center gap-4">
      {page > 1 && (
        <button
          // რაიმე იუზექეისი თუ არ არი ყოველთვის ჯობია ტაილვინდის წინასწარ გაწერილი ერთეული გმოვიყენოთ, თუ ჩვენი პროექტისთვის საჭირო ზომები გვაქ ტაილვინიდს ექსთენდიც შეგვიძლია, ფერებზეც იგივეა
          className="cursor-pointer rounded-[5px] border border-white bg-[#141d2f] px-[10px] py-[5px] text-white outline-none"
          onClick={previousPage}
        >
          Previous
        </button>
      )}
      <p className="text-white">{page}</p>
      {/* მსგავსი ჰარდკოდად ჩაწერილი რიცხვითი მნიშვნელობები ჯობია კონსტანტა გავაკეთოთ
         რამე ლოგიკური სახელით,  მომავალში ბაგებს აირიდებ თავიდან,  const USERS_PER_PAGE = 15;
         /lib/utils/constants.ts შეგიძლია აღწერო
      */}
      {page < Math.ceil(totalPages / 15) && (
        <button
          //                                                                           px-2.5 შეგიძლია გაოიყენო
          className="cursor-pointer rounded-[5px] border border-white bg-[#141d2f] px-[10px] py-[5px] text-white outline-none"
          onClick={nextPage}
        >
          Next
        </button>
      )}
    </div>
  );
}

export { Pagination };
