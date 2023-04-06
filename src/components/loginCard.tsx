export default function LoginCard() {
  return (
    <section
      style={{ height: "100vh", width: "100vw", zIndex: "-1" }}
      className="d-flex align-items-center justify-content-evenly w-100"
      id="home"
    >
      <div className="artemis-logo"></div>
      <form
        style={{ width: "30%" }}
        className="d-flex flex-column align-items-center justify-content-center px-4 py-5"
        id="login-forms"
      >
        <div className="mb-4 w-100">
            <input type="text" className="form-control" placeholder="Username"/>
        </div>
        <div className="mb-4 w-100">
            <input type="text" className="form-control" placeholder="Password"/>
        </div>
        <button type="submit" className="btn btn-info w-100">Log in</button>
      </form>
    </section>
  );
}
