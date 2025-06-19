import { Spinner } from "./Spinner";

function Input() {
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
        />
        <Spinner />
      </div>
    </>
  );
}

export { Input };
