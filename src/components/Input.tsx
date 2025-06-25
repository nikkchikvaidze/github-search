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
          className="absolute top-1/2 left-[10px] -translate-y-1/2 pointer-events-none text-[#999]"
        />
        <input
          className="bg-transparent w-[400px] border border-[#f6f8ff] rounded-[5px] outline-none py-4 px-[0.3rem]"
          type="text"
          id="search-input"
          placeholder="Search Github username"
          maxLength={40}
          value={value}
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
