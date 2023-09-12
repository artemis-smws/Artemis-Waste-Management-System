export default function WebStatusOvelay() {
  return (
    <div style={{zIndex : 1000, backgroundColor : " rgba(0, 0, 0, 0.5)"}} className="position-absolute top-0 right-0 vh-100 vw-100 d-flex justify-content-center align-items-center">
      {securedConntection}
    </div>
  );
}

const underMaintenance = (
  <div className="d-flex justify-content-center align-items-center flex-column">
    <h1 className="text-danger fw-bold">Under Maintenance</h1>
    <p className="text-light ">The development team is currently working on bugs and fixes</p>
  </div>
)
const securedConntection = (
    <div className="d-flex justify-content-center align-items-center flex-column">
      <h1 style={{color : "#47d147"}} className="fw-bold">Connection Secured</h1>
      <p className="text-light ">Succesfully established connection with the server</p>
    </div>
);
