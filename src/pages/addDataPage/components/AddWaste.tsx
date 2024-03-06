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

const AddWaste = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedBuilding, setSelectedBuilding] = useState("Select Building");
  const [selectedType, setSelectedType] = useState("Select Type of Waste");
  const [wasteDescription, setWasteDescription] = useState("");
  const [weight, setWeight] = useState("");

  const handleSubmit = () => {
    setIsOpen(false);
    // Show success toast
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

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleSelectBuilding = (item: string) => {
    setSelectedBuilding(item);
  };

  const handleSelectType = (type: string) => {
    setSelectedType(type);
  };

  const handleWasteDescriptionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setWasteDescription(event.target.value);
  };

  const handleWeightChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWeight(event.target.value);
  };
  
  return (
    <>
      <button type="button" className="btn btn-success" onClick={handleOpen}>
        Add Waste
      </button>
      {isOpen && (
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
                      Biodegredable
                    </DropdownItem>
                    <DropdownItem
                      onClick={() => handleSelectType("RECYCLABLE")}
                    >
                      Recyclable
                    </DropdownItem>
                    <DropdownItem
                      onClick={() => handleSelectType("FOOD WASTE")}
                    >
                      Food waste
                    </DropdownItem>
                    <DropdownItem
                      onClick={() => handleSelectType("INFECTIOUS")}
                    >
                      Infectious
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
                <Form className="mt-3">
                  <label>Waste Description</label>
                  <Form.Control
                    type="text"
                    className="add-waste-input"
                    value={wasteDescription}
                    onChange={handleWasteDescriptionChange}
                  ></Form.Control>
                </Form>
                <Form className="mt-3">
                  <label>Weight</label>
                  <Form.Control
                    type="number"
                    className="weight-input"
                    value={weight}
                    onChange={handleWeightChange}
                  ></Form.Control>
                </Form>
              </div>
            </div>
            <div className="footer d-flex justify-content-end align-items-center w-100 p-3">
              <button
                type="button"
                className="btn btn-secondary m-1"
                onClick={handleClose}
              >
                Close
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
      )}

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
    </>
  );
};

export default AddWaste;
