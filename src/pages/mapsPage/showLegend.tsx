import SelectSchool from "../../components/selectSchool"
import DropdownSelectDate from "../../components/dropdownDate"
import './index.scss'

interface props {
    close: () => void
}

const Legend: React.FC<props> = ({close}) => {

    return(
        <div className="legend-container">
             <div
                  className="d-flex justify-content-center"
                  id="trash-percentage"
                  onClick={close}
                >
                    <div
                      className="d-flex justify-content-center align-items-center"
                      id="t-percentage"
                      style={{ backgroundColor: "green" }}
                    >
                      <h1>0-30%</h1>
                    </div>
                    <div
                      className="d-flex justify-content-center align-items-center"
                      id="t-percentage"
                      style={{ backgroundColor: "yellow" }}
                    >
                      <h1>31%-60%</h1>
                    </div>
                    <div
                      className="d-flex justify-content-center align-items-center"
                      id="t-percentage"
                      style={{ backgroundColor: "rgb(212, 63, 63)" }}
                    >
                      <h1>61%-100%</h1>
                    </div>
                </div>

                <div className="d-flex flex-column justify-content-center align-items-center m-1">
                  <SelectSchool />       
                  <DropdownSelectDate />
                </div>
        </div>
    )
}

export default Legend