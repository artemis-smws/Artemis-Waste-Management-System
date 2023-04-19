export default function Footer() {
  return (
    <div className="h-100 w-100 d-flex flex-column justify-content-end p-3  text-wrap">
      <div className="d-flex align-items-center">
        <img
          src="./assets/img/bsu_logo.png"
          style={{ width: "50px", paddingRight: "10px" }}
          alt="batangas state university logo"
        />
        <p className="text-dark fw-semibold">Batangas State University</p>
      </div>
      <div className="d-flex align-items-center mt-3">
        <img
          src="./assets/img/bsu_logo.png"
          style={{ width: "50px", paddingRight: "10px" }}
          alt="EMU Logo"
        />
        <p className="text-dark fw-semibold">BatStateU General Service Office</p>
      </div>
      <div className="d-flex align-items-center text-wrap mt-3">
        <img
          src="./assets/img/emu_logo.png"
          style={{ width: "50px", paddingRight: "10px" }}
          alt="EMU Logo"
        />
        <p className="text-wrap w-50 fw-semibold text-dark">BatStateU Environmental Management Unit</p>
      </div>
    </div>
  );
}
