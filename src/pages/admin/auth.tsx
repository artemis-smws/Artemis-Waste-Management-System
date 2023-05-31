import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { X } from "react-bootstrap-icons";
import Sidebar from "../../components/layout/sidebar";


export default function Auth(){
    return(
        <div>
            <div className="d-flex">
                <Sidebar/>
                    <div className="d-flex justify-content-center w-100 vh-100">
                        <AuthContent/>
                    </div>
            </div>
        </div>
    ) 
}

function AuthContent(){
    
    const [showPopup, setShowPopup] = useState(false);
    
    function togglePopup(){
        setShowPopup(!showPopup);
    }

    function addUserPopup(): void{
        setShowPopup(!showPopup);
    }

    
    
    function AddUserPopup(){

        if (!showPopup){
            return null;
        }

        function handleFormSubmit(){
            toast.success("Adding user done!");
            setShowPopup(false);
        }

        return(
            <div id="addUserPopup">
                <div className="d-flex justify-content-between align-items-center" id="close-btn">
                    <h1>Add User</h1>
                    <button 
                        type="button" 
                        className="btn btn-close" 
                        onClick={togglePopup}>
                    </button>
                </div>
                <div className="d-flex flex-column justify-content-evenly align-items-center" id="addUserPopupContent">
                    <div className="d-flex flex-column" id="user-email">
                        <h1>Email</h1>
                        <input type="text" id="email-input"/>
                    </div>
                    <div className="d-flex flex-column" id="user-password">
                        <h1>Password</h1>
                        <input type="text" id="password-input"/>
                    </div>
                    <div className="d-flex justify-content-center align-items-center" id="button-container">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            id="addUser"
                            onClick={handleFormSubmit}>
                        Create
                        </button>
                    </div>
                </div>
            </div>
        );
    }
    

    return(
        <div>
            <div className="d-flex justify-content-center align-items-center">
                <div className="d-flex align-items-center" id="auth-title">
                    <Header/>
                    <ToastContainer/>
                </div>
            </div>
            <div className="d-flex justify-content-around align-items-center">
                <div className="d-flex flex-column" id="auth-card">
                    <div className="d-flex justify-content-around align-items-center"id="auth-content">
                        <div className="d-flex align-items-center" id="search-user">
                        <input 
                            type="text" 
                            placeholder="Search by email address" 
                            id="email-search"/>
                        
                        <button 
                            type="button"
                            className="btn btn-secondary"
                            id="add-user"
                            onClick={addUserPopup}>
                        Add User
                        </button>
                        <AddUserPopup/>
                        </div>
                        <i 
                            id="boot-icon" 
                            className="bi bi-arrow-clockwise" 
                            style={{fontSize: '42px', color: 'white'}}>
                        </i>
                        <i 
                            className="bi bi-three-dots-vertical"
                            style={{fontSize: '35px', color: 'white'}}>
                        </i>
                    </div>
                    <div className="d-flex justify-content-center align-items-center">
                        <div className="d-flex justify-content-center align-items-center " id="user-lists"></div>
                    </div>
                </div>
            </div>
        </div>
    );

}

function Header() {
    return (
      <div className="w-100 d-flex border-bottom border-2 shadow align-items-center justify-content-between ps-4 py-3">
        <p className="m-0 fw-bold fs-4">Users</p>
      </div>
    );
  }