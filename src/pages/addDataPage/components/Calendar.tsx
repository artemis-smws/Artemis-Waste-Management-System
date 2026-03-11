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
        <div className="relative">
            <button 
                type="button" 
                className="flex items-center justify-center p-2.5 bg-white border border-gray-300 rounded-md hover:bg-gray-50 text-gray-700 shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-[#216604]" 
                onClick={toggleCalendar} 
                ref={buttonRef}
            >
                <LuCalendarDays className="text-lg" />
            </button>
            {calendarOpen && (
                <div className="absolute top-12 left-0 z-50 bg-white p-2 rounded-lg shadow-panel border border-gray-200" ref={calendarRef}>
                    <DatePicker
                        selected={new Date()}
                        onChange={() => {}}
                        inline
                    />
                </div>
            )}
        </div>
    );
};

export default CalendarButton;
