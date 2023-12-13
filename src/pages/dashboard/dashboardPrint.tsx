import { Link } from "react-router-dom"
import { useEffect } from 'react'

export default function DashboardPrint(){

    const tableHeaders = [
        { label: 'Date', style: { color: 'black' , backgroundColor: "#fcd4dc"} },
        { label: 'Residuals', style: { color: 'black' , backgroundColor: "#fcd4dc"} },
        { label: 'Food Waste', style: { color: 'black' , backgroundColor: "#fcd4dc"} },
        { label: 'Recyclable', style: { color: 'black' , backgroundColor: "#fcd4dc"} },
        { label: 'Total Solid Waste Generated per day', style: { color: 'black' , backgroundColor: "#fcd4dc"} },
    ];

    const generateTableHeader = () => {
        return (
            <tr>
                {tableHeaders.map((header, index) => (
                    <th key={index} style={header.style}>{header.label}</th>
                ))}
            </tr>
        );
    };

    const generateTableRows = () => {
        return tableData.map((data, index) => (
            <tr key={index}>
                <td>{data.date}</td>
                <td>{data.residuals}</td>
                <td>{data.foodWaste}</td>
                <td>{data.recyclable}</td>
                <td style={{ fontWeight: "bold" }}>{data.total}</td>
            </tr>
        ));
    };

    const getDaysInMonth = (month: number, year:number): number => {
        return new Date(year, month, 0).getDate();
    };

    const generateTableData = (month: number, year: number): Array<any> => {
        const daysInMonth = getDaysInMonth(month, year);
        const tableData: Array<any> = [];

        for (let day = 1; day <= daysInMonth; day++) {
            const formattedDate = new Date(year, month - 1, day).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            });
            const residuals = Math.floor(Math.random() * 100);
            const foodWaste = Math.floor(Math.random() * 50);
            const recyclable = Math.floor(Math.random() * 50);
            const total = residuals + foodWaste + recyclable;

            tableData.push({ date: formattedDate, residuals, foodWaste, recyclable, total });
        }

        return tableData;
    };
    

    const getCurrentMonth = () => {
        const currentDate = new Date();
        const month = currentDate.getMonth() + 1;
        const year = currentDate.getFullYear();
        return { month, year };
    }

    const getCurrentDate = () => {
        const currentDate = new Date();
        const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        const month = monthNames[currentDate.getMonth()];
        const year = currentDate.getFullYear();
        return `${month} ${year}`;
    }

    const { month, year } = getCurrentMonth();

    useEffect(() => {
        generateTableData(month, year);
    }, [month, year])

    const tableData = generateTableData(month, year);
    const reportDate = getCurrentDate();

    return(
        <div className="vw-100 vh-100">
            <div className="d-flex justify-content-between" id="top-buttons">
                <div>
                    <button type="button" className="btn btn-secondary print-hidden">
                        <Link to="/dashboard" type="button" className="nav-link mx2">
                            BACK
                        </Link>
                    </button>
                </div>
            </div>

            <br/>
            <div className="d-flex justify-content-center align-items-center" id="report-title">
                ArteMIS Monthly Report
            </div>
            <div className="d-flex justify-content-center align-items-center" id="report-date">
                {reportDate}
            </div>

            <div className="d-flex flex-column justify-content-center">

                <br /> 
                <div id="table-1">
                    <div className="d-flex flex-column justify-content-center align-items-center"id="table-title">
                        <h1>Table 1.</h1>
                        <p>Monthly Waste Collected within the month per day measured by (kg)</p>
                    </div>
                    <table className="table table-bordered">
                        <thead>
                            {generateTableHeader()}
                        </thead>
                        <tbody>
                        {generateTableRows()}
                        <tr style={{ backgroundColor: "green", color: "black", fontWeight: "bold" }}>
                            {/* ... (total row) */}
                        </tr>
                        </tbody>
                    </table>
                </div>

                <br/><br/>
                <div id="table-2">
                    <div className="d-flex flex-column justify-content-center align-items-center"id="table-title">
                        <h1>Table 2.</h1>
                        <h1>Summary Report</h1>
                        <p>On the table, show which day has the highest and lowest amounts of gathered waste, as well as the average waste.</p>
                    </div>
                    <table className="table table-bordered">
                        <tbody>
                            <tr>
                                <td>Highest Waste Gathered in Day</td>
                                <td style={{backgroundColor: "#fcd4dc", color: "black", fontWeight: "bold"}}>511</td>
                            </tr>
                            <tr>
                                <td>Lowest Waste Gathered in a Day</td>
                                <td style={{backgroundColor: "#fcd4dc", color: "black", fontWeight: "bold"}}>2</td>
                            </tr>
                            <tr>
                                <td>Average Waste Gathered in a Month</td>
                                <td style={{backgroundColor: "#fcd4dc", color: "black", fontWeight: "bold"}}>78.67</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <br/><br/>
                <div id="table-3">
                    <div className="d-flex flex-column justify-content-center align-items-center"id="table-title">
                        <h1>Table 3.</h1>
                        <h1>Waste Composition</h1>
                        <p>On the table, show the percent of the different categories of waste that were gathered.</p>
                    </div>
                    <table className="table table-bordered">
                        <tbody>
                            <tr>
                                <td>Hazardous</td>
                                <td style={{backgroundColor: "#fcd4dc", color: "black", fontWeight: "bold"}}>15%</td>
                            </tr>
                            <tr>
                                <td>Residual</td>
                                <td style={{backgroundColor: "#fcd4dc", color: "black", fontWeight: "bold"}}>10%</td>
                            </tr>
                            <tr>
                                <td>Recyclable</td>
                                <td style={{backgroundColor: "#fcd4dc", color: "black" , fontWeight: "bold"}}>25%</td>
                            </tr>
                            <tr>
                                <td>Food Waste</td>
                                <td style={{backgroundColor: "#fcd4dc", color: "black" , fontWeight: "bold"}}>5%</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <br/><br/> 
                <div id="table-4">
                    <div className="d-flex flex-column justify-content-center align-items-center"id="table-title">
                        <h1>Ranking Per Building</h1>
                        <p>On waste production (rank highest when lower production)</p>
                    </div>
                    <table className="table table-bordered">
                        <tbody>
                            <tr>
                                <td>CICS Building</td>
                                <td style={{backgroundColor: "#fcd4dc", color: "black", fontWeight: "bold"}}>10.57kg</td>
                            </tr>
                            <tr>
                                <td>CEAFA Building</td>
                                <td style={{backgroundColor: "#fcd4dc", color: "black", fontWeight: "bold"}}>11.57kg</td>
                            </tr>
                            <tr>
                                <td>SSC Building</td>
                                <td style={{backgroundColor: "#fcd4dc", color: "black", fontWeight: "bold"}}>12.57kg</td>
                            </tr>
                            <tr>
                                <td>CIT Building</td>
                                <td style={{backgroundColor: "#fcd4dc", color: "black", fontWeight: "bold"}}>13.57kg</td>
                            </tr>
                            <tr>
                                <td>Gymnasium Building-Main</td>
                                <td style={{backgroundColor: "#fcd4dc", color: "black", fontWeight: "bold"}}>14.57kg</td>
                            </tr>
                            <tr>
                                <td>ACES Building</td>
                                <td style={{backgroundColor: "#fcd4dc", color: "black", fontWeight: "bold"}}>15.57kg</td>
                            </tr>
                            <tr>
                                <td>Gymnasium Building - Alangilan</td>
                                <td style={{backgroundColor: "#fcd4dc", color: "black", fontWeight: "bold"}}>16.57kg</td>
                            </tr>
                            <tr>
                                <td>Steer Hub Building</td>
                                <td style={{backgroundColor: "#fcd4dc", color: "black", fontWeight: "bold"}}>17.57kg</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )

}