import Navbar from "../navbar";

export default function LandingPage() {
  const style = {
    height: "100vh",
    width: "100vw",
    zIndex: "-1",
  };
  return (
    <>
      <Navbar />
      <section
        style={style}
        className="d-flex align-items-center justify-content-evenly w-100"
        id="home"
      >
        <div className="artemis-logo"></div>
      </section>
    </>
  );
}
