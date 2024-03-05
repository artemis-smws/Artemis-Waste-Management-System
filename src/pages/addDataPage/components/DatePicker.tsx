import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import "../styles/AddWaste.scss";
import { LuCalendarDays } from "react-icons/lu";
import { Form } from "react-bootstrap";

const MyDatePicker: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const target = e.target as HTMLInputElement;
    setSelectedDate(new Date(target.value));
  };

  return (
    <div className="row">
      <div className="col">
        <div className="date-picker-wrapper">
          <Form.Control
            as={DatePicker}
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
