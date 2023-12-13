import { Link, useNavigate } from "react-router-dom"
import { useEffect } from 'react'

export default function DashboardPrint(){
    const navigate = useNavigate()
    useEffect(() => {
        window.print()
        navigate('/dashboard')
    }, [])
    return(

        <div className="vw-100 vh-100">
            <div className="d-flex justify-content-between" id="top-buttons">
                <div>
                    <button type="button" className="btn btn-secondary" onClick={window.print}>
                        PRINT
                    </button>
                </div>
                <div>
                    <button type="button" className="btn btn-secondary">
                        <Link to="/dashboard" type="button" className="nav-link mx2">
                            BACK
                        </Link>
                    </button>
                </div>
            </div>
            <div className="d-flex justify-content-center align-items-center" id="report-title">
                ArteMIS Monthly Report
            </div>
            <div className="d-flex justify-content-center align-items-center" id="report-date">
                January 2023
            </div>

            <div className="d-flex flex-column justify-content-center">
                <div id="table-1">
                    <div className="d-flex flex-column justify-content-center align-items-center"id="table-title">
                        <h1>Table 1.</h1>
                        <p>Monthly Waste Collected within the month per day measured by (kg)</p>
                    </div>
                    <table className="table table-bordered">
                        <thead>
                            <tr style={{backgroundColor: "red", color: "black"}}>
                                <th scope="col">Date</th>
                                <th colSpan={3} scope="colgroup">Types of Solid Waste</th>
                                <th scope="col">Total Solid Waste Generated per day</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td></td>
                                <td>Residuals</td>
                                <td>Food Waste</td>
                                <td>Recyclable</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td scope="row">January 1, 2023</td>
                                <td>30</td>
                                <td>1</td>
                                <td>21</td>
                                <td style={{fontWeight: "bold"}}>52</td>
                            </tr>
                            <tr>
                                <td scope="row">January 2, 2023</td>
                                <td>21</td>
                                <td>3</td>
                                <td>2</td>
                                <td style={{fontWeight: "bold"}}>26</td>
                            </tr>
                            <tr>
                                <td>January 3, 2023</td>
                                <td>33</td>
                                <td>2</td>
                                <td>11</td>
                                <td style={{fontWeight: "bold"}}>46</td>
                            </tr>
                            <tr>
                                <td>January 4, 2023</td>
                                <td>12</td>
                                <td>2</td>
                                <td>1</td>
                                <td style={{fontWeight: "bold"}}>15</td>
                            </tr>
                            <tr>
                                <td>January 5, 2023</td>
                                <td>12</td>
                                <td>2</td>
                                <td>1</td>
                                <td style={{fontWeight: "bold"}}>15</td>
                            </tr>
                            <tr>
                                <td>January 6, 2023</td>
                                <td>445</td>
                                <td>34</td>
                                <td>32</td>
                                <td style={{fontWeight: "bold"}}>511</td>
                            </tr>
                            <tr>
                                <td>January 7, 2023</td>
                                <td>2</td>
                                <td></td>
                                <td></td>
                                <td style={{fontWeight: "bold"}}>2</td>
                            </tr>
                            <tr>
                                <td>January 8, 2023</td>
                                <td>323</td>
                                <td>111</td>
                                <td>22</td>
                                <td style={{fontWeight: "bold"}}>456</td>
                            </tr>
                            <tr>
                                <td>January 9, 2023</td>
                                <td>11</td>
                                <td>4</td>
                                <td>1</td>
                                <td style={{fontWeight: "bold"}}>16</td>
                            </tr>
                            <tr>
                                <td>January 10, 2023</td>
                                <td>54</td>
                                <td>21</td>
                                <td>2</td>
                                <td style={{fontWeight: "bold"}}>77</td>
                            </tr>
                            <tr>
                                <td>January 11, 2023</td>
                                <td>33</td>
                                <td>2</td>
                                <td>1</td>
                                <td style={{fontWeight: "bold"}}>36</td>
                            </tr>
                            <tr>
                                <td>January 12, 2023</td>
                                <td>54</td>
                                <td>1</td>
                                <td>2</td>
                                <td style={{fontWeight: "bold"}}>57</td>
                            </tr>
                            <tr>
                                <td>January 13, 2023</td>
                                <td>14</td>
                                <td>2</td>
                                <td>3</td>
                                <td style={{fontWeight: "bold"}}>19</td>
                            </tr>
                            <tr>
                                <td>January 14, 2023</td>
                                <td>64</td>
                                <td>33</td>
                                <td>22</td>
                                <td style={{fontWeight: "bold"}}>119</td>
                            </tr>
                            <tr>
                                <td>January 15, 2023</td>
                                <td>53</td>
                                <td>22</td>
                                <td>21</td>
                                <td style={{fontWeight: "bold"}}>96</td>
                            </tr>
                            <tr>
                                <td>January 16, 2023</td>
                                <td>34</td>
                                <td>2</td>
                                <td>2</td>
                                <td style={{fontWeight: "bold"}}>38</td>
                            </tr>
                            <tr>
                                <td>January 17, 2023</td>
                                <td>33</td>
                                <td></td>
                                <td>11</td>
                                <td style={{fontWeight: "bold"}}>44</td>
                            </tr>
                            <tr>
                                <td>January 18, 2023</td>
                                <td>52</td>
                                <td>3</td>
                                <td>1</td>
                                <td style={{fontWeight: "bold"}}>56</td>
                            </tr>
                            <tr>
                                <td>January 19, 2023</td>
                                <td>52</td>
                                <td>23</td>
                                <td>1</td>
                                <td style={{fontWeight: "bold"}}>76</td>
                            </tr>
                            <tr>
                                <td>January 20, 2023</td>
                                <td>64</td>
                                <td>22</td>
                                <td>32</td>
                                <td style={{fontWeight: "bold"}}>118</td>
                            </tr>
                            <tr>
                                <td>January 21, 2023</td>
                                <td>34</td>
                                <td>3</td>
                                <td></td>
                                <td style={{fontWeight: "bold"}}>37</td>
                            </tr>
                            <tr>
                                <td>January 22, 2023</td>
                                <td>23</td>
                                <td>24</td>
                                <td>22</td>
                                <td style={{fontWeight: "bold"}}>69</td>
                            </tr>
                            <tr>
                                <td>January 23, 2023</td>
                                <td>54</td>
                                <td>21</td>
                                <td>1</td>
                                <td style={{fontWeight: "bold"}}>76</td>
                            </tr>
                            <tr>
                                <td>January 24, 2023</td>
                                <td>45</td>
                                <td>2</td>
                                <td>2</td>
                                <td style={{fontWeight: "bold"}}>49</td>
                            </tr>
                            <tr>
                                <td>January 25, 2023</td>
                                <td>2</td>
                                <td></td>
                                <td>1</td>
                                <td style={{fontWeight: "bold"}}>3</td>
                            </tr>
                            <tr>
                                <td>January 26, 2023</td>
                                <td>53</td>
                                <td>12</td>
                                <td>2</td>
                                <td style={{fontWeight: "bold"}}>67</td>
                            </tr>
                            <tr>
                                <td>January 27, 2023</td>
                                <td>13</td>
                                <td>1</td>
                                <td>3</td>
                                <td style={{fontWeight: "bold"}}>16</td>
                            </tr>
                            <tr>
                                <td>January 28, 2023</td>
                                <td>63</td>
                                <td>24</td>
                                <td>22</td>
                                <td style={{fontWeight: "bold"}}>109</td>
                            </tr>
                            <tr>
                                <td>January 29, 2023</td>
                                <td>54</td>
                                <td>2</td>
                                <td>21</td>
                                <td style={{fontWeight: "bold"}}>77</td>
                            </tr>
                            <tr>
                                <td>January 30, 2023</td>
                                <td>65</td>
                                <td>3</td>
                                <td>2</td>
                                <td style={{fontWeight: "bold"}}>70</td>
                            </tr>
                            <tr>
                                <td style={{backgroundColor: "green", color:"black", fontWeight: "bold"}}>Total Monthly Waste Gathered for the Month of January 2023</td>
                                <td style={{fontWeight: "bold"}}>1,802</td>
                                <td style={{fontWeight: "bold"}}>382</td>
                                <td style={{fontWeight: "bold"}}>265</td>
                                <td style={{fontWeight: "bold"}}>2,342</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
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