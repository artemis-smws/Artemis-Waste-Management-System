import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import "../styles/AddWaste.scss";
import { LuCalendarDays } from "react-icons/lu";
import { Form } from "react-bootstrap";

const MyDatePicker: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  return (
    <div className="row">
      <div className="col">
        <div className="date-picker-wrapper">
          <DatePicker
            selected={selectedDate}
            onChange={handleChange}
            className="form-control"
          />
          <span className="date-picker-icon">
            <LuCalendarDays />
          </span>
        </div>
      </div>
    </div>
  );
};

export default MyDatePicker;
