import DropdownSelectDate from "../../components/layout/dropdownDate"
import Sidebar from "../../components/layout/sidebar"

const items = ["Name","Location","Capacity (%)","Type","Collected"]

export default function Bin(){

    return(
      <div className="vw-100 vh-100">
      <div className="d-flex vw-100 vh-100">
            
        <div id="logs-sidebar">
            <Sidebar/>
        </div>
            

        <div className="vw-100 vh-100 align-items-center">
            <div className="navbar" id="trashbin-dashboard">
                <h1>Trashbin dashboard</h1>
                <p>This is to be used for monitoring trash bin status and other data related to the IOT trash bins deployed through ArteMIS</p>
            </div>
            <div className="d-flex justify-content-center" id="table">
                <ul className="d-flex justify-content-around align-items-center" id="table-list">
                    {items.map((item) => (<li id="lists">{item}</li>))}
                </ul>
            </div>
            <div className="d-flex justify-content-center">
                <div id="table-content">
                </div>
            </div>
        </div>
      </div>
    </div>
    )

}