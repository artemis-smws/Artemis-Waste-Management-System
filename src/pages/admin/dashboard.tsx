import DisplayLineChart from "../../components/layout/displayLineChart";
import DisplayPieChart from "../../components/layout/displayPieChart";
import Sidebar from "../../components/layout/sidebar";



export default function Dashboard(){

    

    return(
        <div>
            <div className="d-flex">
                <div>
                <Sidebar/>
                </div>
                <div className="vw-100">
                    <div className="navbar d-flex" id="nav-bar">
                        <h1>Dashboard</h1>
                        <button type="button" className="btn" id="print">Print</button>                
                    </div>
                    <div className="d-flex justify-content-center">
                        <div className="d-flex justify-content-center align-items-center" id="trash-stats">
                            <div className="d-flex justify-content-center align-items-center" id="highest">
                                <h1 style={{color: "red"}}>Highest <br /> 25.35kg</h1>
                            </div>
                            <div className="d-flex justify-content-center align-items-center" id="lowest">
                                <h1 style={{color: "green"}}>Lowest <br /> 25.35kg</h1>
                            </div>
                            <div className="d-flex justify-content-center align-items-center" id="average">
                                <h1>Average <br /> 25.35kg</h1>
                            </div>
                        </div>
                    </div>
                    <div className="d-flex justify-content-around align-items-center" id="chart">
                        <div id="waste-generated">
                            <div className="d-flex navbar align-items-center" id="nav-bar1">
                                    <h1>Waste Generated</h1>
                            </div>
                            <div>
                                <div id="linechart">
                                    <DisplayLineChart/>
                                </div>
                            </div>
                        </div>
                        <div id="percentage-per-campus">
                            <div className="navbar align-items-center" id="nav-bar2">
                                <h1>Percentage per campus</h1>
                            </div>
                            <div>
                                <div id="piechart">
                                    <DisplayPieChart/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}