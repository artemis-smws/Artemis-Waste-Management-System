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
            <Form className="input-section w-100 h-100 d-flex flex-column justify-content-around px-3">
              <div>
                <div className="d-flex justify-content-center align-items-center gap-3">
                  <div>
                    <Form.Label>Building</Form.Label>
                    <Form.Select className="add-waste-input d-flex justify-content-between align-items-center">
                      <option value="CEAFA">CEAFA Building</option>
                      <option value="CICS">CICS Building</option>
                      <option value="CIT">CIT Building</option>
                      <option value="ACES">ACES Building</option>
                    </Form.Select>
                  </div>
                  <div>
                    <Form.Label>Date</Form.Label>
                    <div className="row">
                      <div className="col">
                        <div className="date-picker-wrapper">
                          <MyDatePicker />
                          <span className="date-picker-icon">
                            <LuCalendarDays />
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="d-flex justify-content-start flex-column mt-3">
                  <Form.Label>Type of Waste</Form.Label>
                  <Form.Select className="add-waste-input d-flex justify-content-between align-items-center">
                    <option value="biodegradable">Biodegredable</option>
                    <option value="recyclable">Recyclable</option>
                    <option value="residual">Residual</option>
                    <option value="infectious">Infectious</option>
                  </Form.Select>
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
              <div className="d-flex justify-content-end align-items-center w-100">
                <Button
                  type="button"
                  className="btn btn-secondary m-1"
                  onClick={handleClose}
                >
                  Close
                </Button>
                <Button
                  type="submit"
                  className="btn btn-success m-1"
                  onClick={handleSubmit}
                >
                  Confirm
                </Button>
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