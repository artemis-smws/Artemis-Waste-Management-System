import '../styles/Header.scss'
import DeleteButton from './DeleteButton'
import AddWasteButton from './AddButton'
import Dropdown from './DropdownFilter'
import CalendarButton from './Calendar'

interface props{
    isDeleteButtonVisible: boolean;
}

const Header: React.FC<props> = ({ isDeleteButtonVisible }) => {

    return (
        <div>
            <div className='d-flex justify-content-between align-items-center border-bottom border-2 shadow p-3 w-100'>
                <div className='d-flex gap-3 justify-content-between align-items-center w-100'>
                    <div className="w-50 d-flex gap-3">
                        <CalendarButton/>
                        {isDeleteButtonVisible && <DeleteButton/>}
                        <Dropdown/>
                    </div>
                    <div>
                        <AddWasteButton/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header
