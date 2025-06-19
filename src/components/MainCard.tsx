function MainCard() {
  return (
    <>
      <div className="main-card-container d-flex gap-3">
        <img
          className={"avatar"}
          src="https://avatars.githubusercontent.com/u/499550?v=4"
        />
        <div className="card-info-wrapper">
          <div className="d-flex gap-3">
            <img src="assets/icon-user.svg" alt="icon-user" />
            <p>
              Username:<span>torvalds</span>
            </p>
          </div>
          <div className="d-flex gap-3">
            <img src="assets/icon-group.svg" alt="icon-group" />
            <p>
              Followers:<span>230,310</span>
            </p>
          </div>
          <div className="d-flex gap-3">
            <img src="assets/icon-code.svg" alt="icon-code" />
            <p>
              Repos:<span>200</span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export { MainCard };
