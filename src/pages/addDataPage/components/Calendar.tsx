import '../styles/Calendar.scss';
import 'react-datepicker/dist/react-datepicker.css';
import { LuCalendarDays } from 'react-icons/lu';
import { useState, useEffect, useRef } from 'react';
import DatePicker from 'react-datepicker';

const CalendarButton = () => {
    const [calendarOpen, setCalendarOpen] = useState(false);
    const calendarRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            // Close the calendar if clicked outside of it
            if (
                calendarRef.current &&
                !calendarRef.current.contains(event.target as Node) &&
                !buttonRef.current?.contains(event.target as Node) // Check if the button was clicked
            ) {
                setCalendarOpen(false);
            }
        };

        // Add event listener to handle clicks outside of the calendar
        document.addEventListener('mousedown', handleOutsideClick);

        // Cleanup the event listener
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, []);

    const toggleCalendar = () => {
        setCalendarOpen((prevState) => !prevState); // Toggles the state
    };

    return (
        <div>
            <button type="button" className="btn btn-primary bg-success border-0" onClick={toggleCalendar} ref={buttonRef}>
                <LuCalendarDays />
            </button>
            {calendarOpen && (
                <div className="calendar-container" ref={calendarRef}>
                    <DatePicker
                        selected={new Date()}
                        onChange={() => {}}
                        inline // This prop displays the calendar without the input field
                    />
                </div>
            )}
        </div>
    );
};

export default CalendarButton;
