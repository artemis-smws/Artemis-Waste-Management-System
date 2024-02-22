import '../styles/Calendar.scss'
import 'react-datepicker/dist/react-datepicker.css';
import { LuCalendarDays } from "react-icons/lu"
import { useState } from "react"
import DatePicker from 'react-datepicker'

const CalendarButton = () =>{

    const [calendarOpen, setCalendarOpen] = useState(false);

    const toggleCalendar = () => {
        setCalendarOpen(prevState => !prevState); // Toggles the state
    }

    return(
        <div>
            <button type="button" className="btn btn-primary" onClick={toggleCalendar}>
                <LuCalendarDays />
            </button>
            {calendarOpen && (
                <div className="calendar-container">
                    <DatePicker
                        selected={new Date()}
                        onChange={() => {}}
                        inline // This prop displays the calendar without the input field
                    />
                </div>
            )}
        </div>
    )
}

export default CalendarButton;