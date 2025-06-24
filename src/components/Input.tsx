import { Spinner } from "./Spinner";

type InputProps = {
  value: string;
  inputChange: (searchedValue: string) => void;
  isSearching: boolean;
};

function Input({ value, inputChange, isSearching }: InputProps) {
  return (
    <>
      <div className="input-wrapper">
        <img src="assets/icon-search.svg" className="input-icon" />
        <input
          type="text"
          id="search-input"
          placeholder="Search Github username"
          className="input-with-icon"
          maxLength={40}
          value={value}
          onChange={(e) => inputChange(e.target.value)}
        />
        {isSearching && <Spinner />}
      </div>
    </>
  );
}

export { Input };
