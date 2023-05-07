import * as React from 'react';
import { Component } from 'react';
import Dashboard from '../../pages/admin/dashboardPage';


function Sidebar(){

    return(
        <div>
            <div className="d-flex flex-column align-items-center justify-content-between" id='Sidebar'>

                <div className="justify-content-center" id='Project-Logo'>
                    <a href="#" className="d-flex align-items-center justify-content-center">
                        <img src="./assets/img/bsu-logo.png" width="49px" height="49px" />
                        <h1>PROJECT <br/> TITLE</h1>
                    </a>
                </div>

                <div className="d-flex align-items-start" id="Lists">
                    <div className="d-flex align-items-start" id="sLists">
                        <ul className="nav flex-column nav-pills me-3 w-100" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                            <li className="d-flex">
                                <img src="./assets/img/bsu-logo.png" width="35px" height="35px"/><button className="nav-link w-100 d-flex align-content-center" id="v-pills-home-tab" data-bs-toggle="pill" data-bs-target="#v-pills-home" type="button" role="tab" aria-controls="v-pills-home" aria-selected="true">Home</button>
                            </li>
                            <li className="d-flex">
                                <img src="./assets/img/maps.png" width="35px" height="35px"/><button className="nav-link w-100 d-flex align-content-center" id="v-pills-profile-tab" data-bs-toggle="pill" data-bs-target="#v-pills-profile" type="button" role="tab" aria-controls="v-pills-profile" aria-selected="false">Profile</button>
                            </li>
                            <li className="d-flex">
                                <img src="./assets/img/logs.png" width="35px" height="35px"/><button className="nav-link w-100 d-flex align-content-center" id="v-pills-messages-tab" data-bs-toggle="pill" data-bs-target="#v-pills-messages" type="button" role="tab" aria-controls="v-pills-messages" aria-selected="false">Messages</button>
                            </li>    
                        </ul>
                    </div>
                </div>

                <button type="button" className="btn" id="sign-out">SIGN OUT</button>

            </div>
        </div>
    )

}

export default Sidebar;