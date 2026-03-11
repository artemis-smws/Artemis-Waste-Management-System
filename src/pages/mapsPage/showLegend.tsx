import SelectSchool from "../../components/selectSchool"
import DropdownSelectDate from "../../components/dropdownDate"
import { BsX } from "react-icons/bs"

interface props {
    close: () => void
}

const Legend: React.FC<props> = ({close}) => {

    return(
        <div className="absolute z-[1000] w-[450px] bg-white rounded-lg shadow-lg border border-gray-200 bottom-[80px] left-6 overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-gray-50/50">
                <h3 className="text-sm font-semibold tracking-tight text-[#171717] m-0">Legend & Filters</h3>
                <button
                    onClick={close}
                    className="p-1 rounded-full text-gray-500 hover:bg-gray-200 transition-colors"
                >
                    <BsX size={18} />
                </button>
            </div>
            
            <div className="p-4 flex flex-col gap-5">
                <div className="flex justify-between gap-3">
                    <div className="flex-1 flex flex-col items-center justify-center py-2.5 rounded-md bg-[#00cb6a]/10 border border-[#00cb6a]/30">
                      <span className="text-xs font-semibold text-[#00cb6a] uppercase tracking-wide">Normal</span>
                      <span className="text-[10px] font-medium text-gray-600">0 - 39%</span>
                    </div>
                    <div className="flex-1 flex flex-col items-center justify-center py-2.5 rounded-md bg-amber-500/10 border border-amber-500/30">
                      <span className="text-xs font-semibold text-amber-600 uppercase tracking-wide">Moderate</span>
                      <span className="text-[10px] font-medium text-gray-600">40 - 74%</span>
                    </div>
                    <div className="flex-1 flex flex-col items-center justify-center py-2.5 rounded-md bg-red-500/10 border border-red-500/30">
                      <span className="text-xs font-semibold text-red-600 uppercase tracking-wide">Critical</span>
                      <span className="text-[10px] font-medium text-gray-600">75 - 100%</span>
                    </div>
                </div>

                <div className="flex flex-col gap-3 pt-4 border-t border-gray-100">
                  <SelectSchool />       
                  <div className="flex justify-center w-full">
                    <DropdownSelectDate />
                  </div>
                </div>
            </div>
        </div>
    )
}

export default Legend