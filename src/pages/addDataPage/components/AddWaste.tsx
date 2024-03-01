import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MyDatePicker from "./DatePicker";
import "../styles/AddWaste.scss";
import { IoIosCloseCircleOutline } from "react-icons/io";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Form,
} from "react-bootstrap";

interface props {
  onClose: () => void;
}

const AddWaste: React.FC<props> = ({ onClose }) => {
  const handleSubmit = () => {
    toast.success("Data Added. ", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  const [selectedBuilding, setSelectedBuilding] = useState("Select Building");
  const [selectedType, setSelectedType] = useState("Select Type of Waste");

  const handleSelectBuilding = (item) => {
    setSelectedBuilding(item);
  };

  const handleSelectType = (type) => {
    setSelectedType(type);
  };

  return (
    <div>
      <div className="add-card">
        <div className="add-card-content d-flex flex-column justify-content-between align-items-center">
          <div className="header w-100 p-3 d-flex justify-content-start align-items-center">
            <h1 className="m-0">Add Waste</h1>
          </div>
          <div className="input-section w-100 h-100 p-4 d-flex flex-column justify-content-center">
            <div className="d-flex justify-content-center align-items-center gap-3">
              <div>
                <label>Building</label>
                <Dropdown>
                  <DropdownToggle
                    className="add-waste-input d-flex justify-content-between align-items-center"
                    variant="light"
                  >
                    {selectedBuilding}
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem
                      onClick={() => handleSelectBuilding("CEAFA BUILDING")}
                    >
                      CEAFA BUILDING
                    </DropdownItem>
                    <DropdownItem
                      onClick={() => handleSelectBuilding("CICS BUILDING")}
                    >
                      CICS BUILDING
                    </DropdownItem>
                    <DropdownItem
                      onClick={() => handleSelectBuilding("CIT BUILDING")}
                    >
                      CIT BUILDING
                    </DropdownItem>
                    <DropdownItem
                      onClick={() => handleSelectBuilding("ACES BUILDING")}
                    >
                      ACES BUILDING
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </div>
              <div>
                <label>Date</label>
                <MyDatePicker />
              </div>
            </div>
            <div className="d-flex justify-content-start flex-column mt-3">
              <label>Type of Waste</label>
              <Dropdown>
                <DropdownToggle
                  className="add-waste-input d-flex justify-content-between align-items-center"
                  variant="light"
                >
                  {selectedType}
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem
                    onClick={() => handleSelectType("BIODEGRADABLE")}
                  >
                    BIODEGRADABLE
                  </DropdownItem>
                  <DropdownItem onClick={() => handleSelectType("RECYCLABLE")}>
                    RECYCLABLE
                  </DropdownItem>
                  <DropdownItem onClick={() => handleSelectType("FOOD WASTE")}>
                    FOOD WASTE
                  </DropdownItem>
                  <DropdownItem onClick={() => handleSelectType("INFECTIOUS")}>
                    INFECTIOUS
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
              <Form className="mt-3">
                <label>Waste Description</label>
                <Form.Control
                  type="text"
                  className="add-waste-input"
                ></Form.Control>
              </Form>
              <Form className="mt-3">
                <label>Weight</label>
                <Form.Control
                  type="number"
                  className="weight-input"
                ></Form.Control>
              </Form>
            </div>
          </div>
          <div className="footer d-flex justify-content-end align-items-center w-100 p-3">
            <button
              type="button"
              className="btn btn-secondary m-1"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-success m-1"
              onClick={handleSubmit}
            >
              Confirm
            </button>
          </div>
        </div>
      </div>

      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
};

export default AddWaste;
