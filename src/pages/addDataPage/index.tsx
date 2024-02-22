import Sidebar from "../../components/layout/sidebar";
import DataTable from "./components/DataTable";
import Header from "./components/Header";
import { useState } from "react";
import React from "react";

export default function AddPage() {

    const [isDeleteButtonVisible, setDeleteButtonVisible] = useState<boolean>(false);

    return (
        <div className="d-flex">
            <div>
                <Sidebar/>
            </div>
            
            <div className="w-100 vh-100">
                <div>
                    <Header isDeleteButtonVisible={isDeleteButtonVisible}/>
                </div>
                <div className="m-4">
                    <DataTable toggleDeleteButtonVisibility={setDeleteButtonVisible}/>
                </div>
                
            </div>
        </div>
    )
}