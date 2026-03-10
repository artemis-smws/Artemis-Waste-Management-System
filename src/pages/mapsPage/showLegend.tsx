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
                  className="flex justify-center"
                  id="trash-percentage"
                  onClick={close}
                >
                    <div
                      className="flex justify-center items-center"
                      id="t-percentage"
                      style={{ backgroundColor: "green" }}
                    >
                      <h1>0-30%</h1>
                    </div>
                    <div
                      className="flex justify-center items-center"
                      id="t-percentage"
                      style={{ backgroundColor: "yellow" }}
                    >
                      <h1>31%-60%</h1>
                    </div>
                    <div
                      className="flex justify-center items-center"
                      id="t-percentage"
                      style={{ backgroundColor: "rgb(212, 63, 63)" }}
                    >
                      <h1>61%-100%</h1>
                    </div>
                </div>

                <div className="flex flex-col justify-center items-center m-1">
                  <SelectSchool />       
                  <DropdownSelectDate />
                </div>
        </div>
    )
}

export default Legend