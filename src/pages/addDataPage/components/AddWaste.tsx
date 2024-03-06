import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MyDatePicker from "./DatePicker";
import "../styles/AddWaste.scss";
import { Form, Button } from "react-bootstrap";
import { LuCalendarDays } from "react-icons/lu";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const AddWaste = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [wasteDescription, setWasteDescription] = useState("");
  const [weight, setWeight] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const target = e.target as HTMLInputElement;
    setSelectedDate(new Date(target.value));
  };

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
            <Form className="input-section w-100 h-100 d-flex flex-column justify-content-around">
              <div>
                <div className="d-flex justify-content-center align-items-center gap-3">
                  <div>
                    <Form.Label>Building</Form.Label>
                    <Form.Select className="add-waste-input d-flex justify-content-between align-items-center">
                      <option value="">CEAFA BUILDING</option>
                      <option value="">CICS BUILDING</option>
                      <option value="">CIT BUILDING</option>
                      <option value="">ACES BUILDING</option>
                    </Form.Select>
                  </div>
                  <div>
                    <Form.Label>Date</Form.Label>
                    <div className="row">
                      <div className="col">
                        <div className="date-picker-wrapper">
                          <Form.Control
                            as={DatePicker}
                            selected={selectedDate}
                            onChange={handleChange}
                            className="form-control"
                          />
                          <span className="date-picker-icon">
                            <LuCalendarDays />
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="d-flex justify-content-start flex-column mt-3 px-3">
                  <Form.Label>Type of Waste</Form.Label>
                  <Form.Select className="add-waste-input d-flex justify-content-between align-items-center">
                    <option value="">BIODEGRADABLE</option>
                    <option value="">RECYCLABLE</option>
                    <option value="">FOOD WASTE</option>
                    <option value="">INFECTIOUS</option>
                  </Form.Select>
                  <div className="mt-3">
                    <Form.Label>Waste Description</Form.Label>
                    <Form.Control
                      type="text"
                      className="add-waste-input"
                      value={wasteDescription}
                      onChange={handleWasteDescriptionChange}
                    ></Form.Control>
                  </div>
                  <div className="mt-3">
                    <Form.Label>Weight</Form.Label>
                    <Form.Control
                      type="number"
                      className="weight-input"
                      value={weight}
                      onChange={handleWeightChange}
                    ></Form.Control>
                  </div>
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
            </Form>
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
