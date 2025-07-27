import { Spinner } from "./Spinner";

type InputProps = {
  value: string;
  inputChange: (searchedValue: string) => void;
  isSearching: boolean;
};

function Input({ value, inputChange, isSearching }: InputProps) {
  return (
    <>
      <div className="relative w-[500px]">
        <img
          src="assets/icon-search.svg"
          className="pointer-events-none absolute top-1/2 left-[10px] -translate-y-1/2 text-[#999]"
        />
        <input
          className="w-[400px] rounded-[5px] border border-[#f6f8ff] bg-transparent px-[0.3rem] py-4 outline-none"
          type="text"
          id="search-input"
          placeholder="Search Github username"
          maxLength={40}
          value={value}
          // ტაილვინდით მსგავსი ჩანაწერის გაკეთება შეგიძლია,
          // თუ რაიმე კონკრეტული ქეისი არ გვაქ ყოველთვის ჯობია ავირიდოთ თავიდან კლასნეიმთან ერთად style ატრიბუტის გამოყენება
          style={{
            paddingLeft: "50px",
            height: "50px",
            width: "100%",
            fontSize: "14px",
          }}
          onChange={(e) => inputChange(e.target.value)}
        />
        {isSearching && <Spinner />}
      </div>
    </>
  );
}

export { Input };
