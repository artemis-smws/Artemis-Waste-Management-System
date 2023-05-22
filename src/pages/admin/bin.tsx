import DropdownSelectDate from "../../components/layout/dropdownDate";
import Sidebar from "../../components/layout/sidebar";
import { InfoCircle } from "react-bootstrap-icons";

const items = ["Name", "Location", "Capacity (%)", "Type", "Collected"];

export default function Bin() {
  return (
    <div>
      <div className="d-flex">
        <Sidebar />
        <div className="vw-100 vh-100 overflow-hidden">
          <Header />
          <div
            className="h-100 w-100 d-flex flex-column align-items-center px-4 py-4 border"
            style={{ overflowY: "scroll" }}
          >
            <BinTable />
          </div>
        </div>
      </div>
    </div>
  );
}

function Header() {
  return (
    <div className="d-flex flex-column border-bottom border-2 shadow align-items-start justify-content-between ps-4 py-3">
      <p className="m-0 fw-bold fs-4">Trashbin dashboard</p>
      <div className="m-0 fs-6 d-flex align-items-center justify-content-start">
        <InfoCircle />
        <p className="m-0 ms-2">
          This is to be used for monitoring trash bin status and other data
          related to the IOT trash bins deployed through ArteMIS{" "}
        </p>
      </div>
    </div>
  );
}

function BinTable() {
  return (
    <table className="table table-bordered">
      <thead className="bg-red">
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Location</th>
          <th scope="col">Capacity (%)</th>
          <th scope="col">Type</th>
          <th scope="col">Collected</th>
        </tr>
      </thead>
      <tbody>
          <tr>
            <td>artemis.a1</td>
            <td>CICS</td>
            <td>98</td>
            <td>Residual</td>
            <td>Collected</td>
          </tr>
      </tbody>
    </table>
  );
}
