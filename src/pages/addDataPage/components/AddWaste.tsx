import React, { useState } from 'react';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MyDatePicker from "./DatePicker";
import '../styles/AddWaste.scss'
import { IoIosCloseCircleOutline } from "react-icons/io";

const addWaste = [
    {
        building: 'Building', 
        date: 'Date',
        WasteType: [
            {
                wastetype: 'Type of Waste',
            },
            {
                description: 'Waste Description',
            },
            {
                weight: 'Weight'
            },
        ]
    },
]


interface props{
    onClose: () => void
}

const AddWaste: React.FC<props> = ( {onClose} ) =>{

    const handleSubmit = () => {
        toast.success('Data Added. ', {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
    }

    return(
        <div>
            {addWaste.map((position, index) => (
                <div className="add-card">
                    <div className="add-card-content d-flex flex-column justify-content-between align-items-center">
                        <div className="header w-100 p-3 d-flex justify-content-between align-items-center">
                            <h1 className='m-0'>Add Waste</h1>
                            <IoIosCloseCircleOutline onClick={onClose}/>
                        </div>
                        <div key={index} className="d-flex flex-column justify-content-center w-100 h-100 p-4 input-section">
                            <div className="d-flex justify-content-around align-items-center w-100 pl-1">
                                <div className="d-flex flex-column">
                                    <label>{position.building}</label>
                                    <input type="text" />
                                </div>
                                <div className="d-flex flex-column">
                                    <label>{position.date}</label>
                                    <MyDatePicker/>
                                </div>
                            </div>
                            <div className="d-flex flex-column justify-content-start w-100 p-2 gap-3">
                                {position.WasteType.map((waste, idx) => (
                                    <div key={idx} className="d-flex flex-column">
                                        <label className="m-1">{Object.values(waste)[0]}</label>
                                        <input type="text" />
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className='footer d-flex justify-content-end align-items-center w-100 p-3'>
                            <button type="button" className='btn btn-secondary m-1' onClick={onClose}>Cancel</button>
                            <button type="button" className="btn btn-success m-1" onClick={handleSubmit}>Confirm</button>
                        </div>
                    </div>
                </div>
            ))}
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
    )
}


export default AddWaste