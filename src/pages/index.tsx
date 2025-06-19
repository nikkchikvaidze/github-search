import { Input } from "../components/Input";
import { MainCard } from "../components/MainCard";
import "./MainPage.css";

function MainPage() {
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
          {Array.from({ length: 15 }, (_, i) => i + 1).map(() => (
            <MainCard />
          ))}
        </div>
      </div>
    </>
  );
}

export { MainPage };
