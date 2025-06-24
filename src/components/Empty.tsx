function Empty() {
  return (
    <div
      className="d-flex justify-content-center mt-3"
      style={{ marginTop: "3rem", textAlign: "center" }}
    >
      <h1
        style={{
          color: "white",
        }}
      >
        There is no user with searched name, Please Try different one
      </h1>
    </div>
  );
}

export { Empty };
